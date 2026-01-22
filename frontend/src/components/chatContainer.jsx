import { useEffect, useRef, useState } from "react";
import InputComp from "./input.jsx";
import { formatMessageTime } from "../lib/utils.js";
import avatar from "../assets/avatar.jpg";
import { useAuthStore } from "../lib/authStore.js";
import useChatStore from "../lib/useChatStore.js";
import MessageSkeleton from "../skeletons/messageSkele.jsx";
import { MoreVertical, Search, ArrowLeft, X } from "lucide-react";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    isLoadingMessages,
    setSelectedUser
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const messageEndRef = useRef(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const filteredMessages = messages.filter(msg =>
    msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayMessages = searchTerm ? filteredMessages : messages;

  if (isLoadingMessages) return <div className="h-full w-full bg-[#0b141a]"><MessageSkeleton /></div>;

  return (
    <div className="flex flex-col h-full relative w-full">
      {/* Chat Header */}
      <div className="premium-header">

        {isSearchOpen ? (
          <div className="flex-1 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <button onClick={() => { setIsSearchOpen(false); setSearchTerm(""); }} className="text-[var(--text-secondary)] hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-[var(--bg-primary)] rounded-2xl px-4 py-1.5 flex items-center border border-white/5">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-transparent border-none focus:outline-none text-[var(--text-primary)] text-sm"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="text-[var(--text-secondary)]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="md:hidden text-[var(--text-secondary)] mr-1"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="relative">
                <img
                  src={selectedUser?.profilePicture || avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-transparent hover:ring-[var(--color-accent)]/30 transition-all shadow-md"
                />
                {onlineUsers?.includes(selectedUser._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)] shadow-sm"></span>
                )}
              </div>
              <div className="cursor-pointer">
                <h3 className="font-bold text-[var(--text-primary)] leading-tight">{selectedUser?.username}</h3>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${onlineUsers?.includes(selectedUser._id) ? "text-[var(--color-accent)]" : "text-[var(--text-secondary)]"}`}>
                  {onlineUsers?.includes(selectedUser._id) ? "Active Now" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-[var(--color-accent)] transition-all p-2 hover:bg-white/5 rounded-full" title="Search">
                <Search className="w-5 h-5 cursor-pointer" />
              </button>
              <button className="hover:text-[var(--color-accent)] transition-all p-2 hover:bg-white/5 rounded-full">
                <MoreVertical className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 custom-scrollbar chat-bg relative">
        {displayMessages.length === 0 && searchTerm ? (
          <div className="text-center text-[var(--text-secondary)] mt-10">
            <p className="text-sm">No messages found for <span className="text-[var(--color-accent)] font-bold">"{searchTerm}"</span></p>
          </div>
        ) : (
          displayMessages.map((message) => {
            const isMe = message.senderId === authUser._id;
            return (
              <div key={message._id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative max-w-[85%] sm:max-w-[65%] px-4 py-2.5 rounded-[1.5rem] shadow-md text-sm flex flex-col transition-all border border-white/5 ${isMe
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--incoming-bubble)] text-[var(--text-primary)]"
                    }`}
                >
                  {message.photo && (
                    <img
                      src={message.photo}
                      alt="Attachment"
                      className="rounded-[1rem] mb-2 w-full object-cover max-h-72 shadow-inner"
                    />
                  )}

                  <div className="flex flex-wrap items-end gap-3 leading-relaxed break-words">
                    <p className="flex-1 min-w-[50px]">{message.text}</p>
                    <span className={`text-[10px] min-w-fit font-medium opacity-70`}>
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[var(--bg-secondary)] w-full">
        <InputComp />
      </div>
    </div>
  );
};

export default ChatContainer;
