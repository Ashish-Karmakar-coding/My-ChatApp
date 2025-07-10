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
        try {
            const response = await axiosInstance.get('/users/check-user');
            set({authUser: response.data});
        } catch (error) {
            console.error("Check Auth Error:", error);
            set({ authUser: null});
        } finally{
            set({isCheckingAuth: false});
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
            set({authUser: response.data});
            toast.success("Log In Successful!");

        } catch (error) {
            toast.error("Log in Failed. Please try again.");
            console.error("Log in Error:", error);
            set({isLoggingIn: false});
        }finally{
            set({isLoggingIn: false});
        }
    },
    logout: async() =>{
        set({isCheckingAuth: true});
        // Simulate API call
        try {
            await axiosInstance.get('/users/logout');
            set({authUser: null});
            toast.success("Log Out Successful!");
        } catch (error) {
            console.error("Log Out Error:", error);
            toast.error(error.message   );
        }finally{
            set({isCheckingAuth: false});
        }
    }

}))