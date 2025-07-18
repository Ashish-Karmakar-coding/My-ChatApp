import { useEffect, useRef } from "react";
import InputComp from "./input.jsx";
import Header from "./header.jsx";
import { formatMessageTime } from "../lib/utils.js";
import avatar from "../assets/avatar.jpg";
import { useAuthStore } from "../lib/authStore.js";
import useChatStore from "../lib/useChatStore.js";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className=" flex flex-col w-full bg-gray-800">
      <Header />

      {/* Messages area */}
      <div
        className="overflow-y-auto p-4 space-y-4"
        style={{ height: "calc(100vh - 64px - 115px)" }}
        // 64px for header, 80px for input (adjust as needed)
      >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || avatar
                      : selectedUser?.profilePicture || avatar
                  }
                  className="rounded-full object-cover w-full h-full"
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 text-zinc-100">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col text-zinc-100">
              {message.photo && (
                <img
                  src={message.photo}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div key="message-end" ref={messageEndRef} />
      </div>

      {/* Fixed input at bottom */}
      <div className="fixed bottom-0 left-55 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <InputComp />
      </div>
    </div>
  );
};

export default ChatContainer;
