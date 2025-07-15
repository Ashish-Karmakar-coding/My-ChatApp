import {create} from 'zustand';
import {axiosInstance} from '../axios/axios.js';
import {toast} from 'react-hot-toast';

const useChatStore = create((set,get) => ({
    messages :[],
    users : [],

    selectedUser: null,

    isLoadingMessages: false,
    isLoadingUsers: false,

    getUsers: async () =>{
        set({isLoadingUsers: true});
        try {
            const response = await axiosInstance.get('/messages/users');
            set({users: response.data});
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        }finally{
            set({isLoadingUsers: false});
        }
    },
    getMessages: async(userId) =>{
        set({isLoadingMessages: true});
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({messages: response.data.messages, selectedUser: userId});
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to fetch messages');
        } finally {
            set({isLoadingMessages: false});
        }
    },
    sendMessage:async (messageData)=>{
        const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),



}))

export default useChatStore;