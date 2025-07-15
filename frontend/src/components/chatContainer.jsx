import { use, useEffect, useRef } from "react";
import InputComp from './input.jsx'
import Header from './header.jsx'
import MessageSkele from '../skeletons/messageSkele.jsx'
import { formatMessageTime } from '../lib/ulits.js'
import avatar from '../assets/avatar.jpg'
import {useAuthStore} from '../lib/authStore.js'

import useChatStore from '../lib/useChatStore.js'

const ChatContainer = () => {

  const {selectedUser,messages,isLoadingMessages,getMessages} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser);
  },[selectedUser,getMessages])
console.log(selectedUser)


  return (
    <>
    <div className='flex flex-col w-full h-full bg-gray-800 p-4 '>

      <Header />
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || avatar
                      : selectedUser.profilePicture || avatar
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <InputComp/>
    </div>

    </>
  )
}

export default ChatContainer
