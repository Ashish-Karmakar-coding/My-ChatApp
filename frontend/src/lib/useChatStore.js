import {create} from 'zustand';
import {axiosInstance} from '../axios/axios.js';
import {toast} from 'react-hot-toast';

export const useChatStore = create((set) => ({
    messages :[],
    users : [],

    selectedUser: null,

    isLoadingMessages: false,
    isLoadingUsers: false,

    


}))