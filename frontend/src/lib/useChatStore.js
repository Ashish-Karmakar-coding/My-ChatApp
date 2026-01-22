import { create } from "zustand";
import { axiosInstance } from "../axios/axios.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./authStore.js";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],

  selectedUser: null,

  isLoadingMessages: false,
  isLoadingUsers: false,

  getUsers: async () => {
    set({ isLoadingUsers: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      set({ isLoadingUsers: false });
    }
  },
  getMessages: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      set({ isLoadingMessages: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  deleteMessage: async (messageId, type) => {
    const { messages } = get();
    try {
      await axiosInstance.delete(`/messages/${messageId}`, { data: { type } });
      if (type === "me") {
        set({
          messages: messages.filter((msg) => msg._id !== messageId),
        });
      } else {
        // "everyone"
        set({
          messages: messages.map((msg) =>
            msg._id === messageId ? { ...msg, text: "This message was deleted", photo: null, isDeletedForEveryone: true } : msg
          ),
        });
      }
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const { messages } = get();
      set({
        messages: [...messages, newMessage],
      });
    });

    socket.on("messageDeleted", ({ messageId, type }) => {
      const { messages } = get();
      if (type === "everyone") {
        set({
          messages: messages.map((msg) =>
            msg._id === messageId ? { ...msg, text: "This message was deleted", photo: null, isDeletedForEveryone: true } : msg
          ),
        });
      }
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messageDeleted");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export default useChatStore;