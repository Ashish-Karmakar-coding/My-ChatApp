import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser : null,
    isLoggingIn : false,
    isSigningUp : false,
    isUpdatingProfile : false,
    
    isCheckingAuth : true,

}))