import { useEffect, useRef } from "react";
import InputComp from "./Input.jsx";
import Header from "./Header.jsx";
import { formatMessageTime } from "../lib/utils.js";
import avatar from "../assets/avatar.jpg";
import { useAuthStore } from "../lib/authStore.js";
import useChatStore from "../lib/useChatStore.js";
import MessageSkeleton from "../skeletons/MessageSkele.jsx";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    isLoadingMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoadingMessages) {
    return <MessageSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col bg-black/10 relative overflow-hidden">
      <Header />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full ring-1 ring-white/10 shadow-2xl">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || avatar
                      : selectedUser?.profilePicture || avatar
                  }
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="chat-header mb-1 text-[10px] sm:text-xs opacity-50 tracking-wider font-medium">
              <time className="mx-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div
              className={`chat-bubble flex flex-col min-h-0 py-2 sm:py-3 px-4 rounded-2xl shadow-xl transition-all duration-300 ${message.senderId === authUser._id
                ? "bg-gradient-to-br from-cyan-600/80 to-purple-600/80 text-white backdrop-blur-md ring-1 ring-white/10"
                : "modern-glass text-slate-100"
                }`}
            >
              {message.photo && (
                <img
                  src={message.photo}
                  alt="Attachment"
                  className="max-w-[180px] sm:max-w-[240px] rounded-xl mb-2.5 shadow-lg ring-1 ring-white/5"
                />
              )}
              {message.text && <p className="leading-relaxed text-sm sm:text-base font-medium">{message.text}</p>}
            </div>

            <div className="chat-footer opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Optional: Delivery status */}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg border-t border-white/5">
        <InputComp />
      </div>
    </div>
  );
};

export default ChatContainer;
