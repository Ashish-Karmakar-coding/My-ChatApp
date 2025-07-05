import {create} from 'zustand'
import {axiosInstance} from '../utils/axiosInstance.js'
import {toast} from 'react-hot-toast'

export const useAuthStore = create((set)=>({
    authUser : null,
    isLoggingIn : false,
    isSigningUp : false,
    isUpdatingProfile : false,
    
    isCheckingAuth : true,

    signUp: async (data) => {
        set({isSigningUp: true});
        // Simulate API call
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({authUser: response.data, isSigningUp: false});
            toast.success("Sign Up Successful!");
            
        } catch (error) {
            toast.error("Sign Up Failed. Please try again.");
            console.error("Sign Up Error:", error);
            set({isSigningUp: false});
        }
    },
    Login: async (data) => {
        set({isLoggingIn: true});
        // Simulate API call
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({authUser: response.data, isLoggingIn: false});
            toast.success("Log In Successful!");

        } catch (error) {
            toast.error("Log in Failed. Please try again.");
            console.error("Log in Error:", error);
            set({isLoggingIn: false});
        }
    },

}))