import {create} from 'zustand'
import {axiosInstance} from '../axios/axios.js'
import {toast} from 'react-hot-toast'

export const useAuthStore = create((set)=>({
    authUser : null,
    isLoggingIn : false,
    isSigningUp : false,
    isUpdatingProfile : false,
    
    isCheckingAuth : true,

    checkAuth: async () => {
        set({isCheckingAuth: true});
        // Simulate API call
        try {
            const response = await axiosInstance.get('/users/check-user');
            set({authUser: response.data, isCheckingAuth: false});
        } catch (error) {
            console.error("Check Auth Error:", error);
            set({isCheckingAuth: false , authUser: null});
        }
    },
    signUp: async (data) => {
        set({isSigningUp: true});
        // Simulate API call
        try {
            const response = await axiosInstance.post("/users/signup", data);
            set({authUser: response.data});
            toast.success("Sign Up Successful!");
            
        } catch (error) {
            toast.error(error.response.data.message || "Sign up Failed. Please try again.");
            console.error("Sign Up Error:", error);
            set({isSigningUp: false});
        }finally{
            set({isSigningUp: false});
        }
    },
    Login: async (data) => {
        set({isLoggingIn: true});
        // Simulate API call
        try {
            const response = await axiosInstance.post('/users/login', data);
            set({authUser: response.data, isLoggingIn: false});
            toast.success("Log In Successful!");

        } catch (error) {
            toast.error("Log in Failed. Please try again.");
            console.error("Log in Error:", error);
            set({isLoggingIn: false});
        }
    },

}))