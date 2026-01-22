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
  const { authUser } = useAuthStore();
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
      <div className="h-[var(--header-height)] bg-[var(--bg-secondary)] px-4 py-2 flex items-center justify-between border-l border-[var(--glass-border)] border-opacity-10 z-10 shadow-sm">

        {isSearchOpen ? (
          <div className="flex-1 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <button onClick={() => { setIsSearchOpen(false); setSearchTerm(""); }} className="text-[var(--text-secondary)] hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-[var(--bg-primary)] rounded-lg px-4 py-1.5 flex items-center">
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
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              </div>
              <div className="cursor-pointer">
                <h3 className="font-medium text-[var(--text-primary)] leading-tight">{selectedUser?.username}</h3>
                <p className="text-xs text-[var(--text-secondary)]">click here for contact info</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-[var(--text-primary)] transition-colors" title="Search">
                <Search className="w-5 h-5 cursor-pointer" />
              </button>
              <MoreVertical className="w-5 h-5 cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-2 custom-scrollbar chat-bg relative">
        {displayMessages.length === 0 && searchTerm ? (
          <div className="text-center text-[var(--text-secondary)] mt-10">
            <p>No messages found for "{searchTerm}"</p>
          </div>
        ) : (
          displayMessages.map((message) => {
            const isMe = message.senderId === authUser._id;
            return (
              <div key={message._id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative max-w-[85%] sm:max-w-[60%] px-3 py-1.5 rounded-lg shadow-sm text-sm flex flex-col ${isMe
                      ? "bg-[var(--color-accent)] text-white rounded-tr-none"
                      : "bg-[var(--incoming-bubble)] text-[var(--text-primary)] rounded-tl-none"
                    }`}
                >
                  {message.photo && (
                    <img
                      src={message.photo}
                      alt="Attachment"
                      className="rounded-lg mb-1.5 w-full object-cover max-h-60"
                    />
                  )}

                  <div className="flex flex-wrap items-end gap-2 leading-relaxed break-words">
                    <p className="mb-1">{message.text}</p>
                    <span className={`text-[10px] ml-auto min-w-fit ${isMe ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>

                  {/* Triangle Corner */}
                  <div className={`absolute top-0 w-0 h-0 border-8 ${isMe
                      ? "right-[-8px] border-l-[var(--color-accent)] border-r-transparent border-t-[var(--color-accent)] border-b-transparent"
                      : "left-[-8px] border-r-[var(--incoming-bubble)] border-l-transparent border-t-[var(--incoming-bubble)] border-b-transparent"
                    }`}></div>

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
