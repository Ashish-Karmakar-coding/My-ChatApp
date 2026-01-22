import { create } from "zustand";
import { axiosInstance } from "../axios/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/"; // Replace with your server URL

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,

  onlineUsers: [],

  isCheckingAuth: true,

  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/users/check-user");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.error("Check Auth Error:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    // Simulate API call
    try {
      const response = await axiosInstance.post("/users/signup", data);
      set({ authUser: response.data });
      toast.success("Sign Up Successful!");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response.data.message || "Sign up Failed. Please try again."
      );
      console.error("Sign Up Error:", error);
      set({ isSigningUp: false });
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    // Simulate API call
    try {
      const response = await axiosInstance.post("/users/login", data);
      set({ authUser: response.data });
      toast.success("Log In Successful!");
      get().connectSocket();
    } catch (error) {
      toast.error("Log in Failed. Please try again.");
      console.error("Log in Error:", error);
      set({ isLoggingIn: false });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/users/logout");
      set({ authUser: null });
      toast.success("Log Out Successful!");
      get().disconnectSocket();
    } catch (error) {
      console.error("Log Out Error:", error);
      toast.error(error.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/users/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Profile Update Failed. Please try again."
      );
      console.error("Update Profile Error:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  deleteAccount: async () => {
    try {
      await axiosInstance.delete("/users/delete");
      set({ authUser: null });
      toast.success("Account deleted successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Delete Account Error:", error);
      toast.error(error.message || "Failed to delete account");
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    });
    socket.connect();

    set({ socket: socket })

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

