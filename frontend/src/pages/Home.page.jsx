import { useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import useChatStore from "../lib/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";
import { MessageSquare } from "lucide-react";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-[var(--bg-primary)] overflow-hidden">
      <div className="flex h-full max-w-[1700px] mx-auto relative">
        {/* Sidebar - Visible on desktop, or on mobile when no user is selected */}
        <div
          className={`
            ${selectedUser ? "hidden md:flex" : "flex"} 
            w-full md:w-[400px] lg:w-[450px] flex-col border-r border-white/5 bg-[var(--bg-secondary)]
          `}
        >
          <Sidebar />
        </div>

        {/* Chat Area - Visible on desktop, or on mobile when a user is selected */}
        <div
          className={`
            ${!selectedUser ? "hidden md:flex" : "flex"} 
            flex-1 flex-col h-full bg-[var(--bg-primary)] relative
          `}
        >
          {!selectedUser ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-primary)]">
              <div className="w-40 h-40 bg-[var(--bg-secondary)] rounded-[3rem] flex items-center justify-center mb-8 shadow-2xl border border-white/5 relative group transition-transform hover:scale-105 duration-500">
                <div className="absolute inset-0 bg-[var(--color-accent)] opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity" />
                <MessageSquare className="w-20 h-20 text-[var(--color-accent)] relative z-10" />
              </div>
              <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
                Melo Chat
              </h1>
              <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
                Experience the next generation of messaging with a <span className="text-[var(--color-accent)] font-semibold">Premium Orange</span> touch.
              </p>
              <div className="mt-12 px-6 py-2 bg-[var(--bg-secondary)] rounded-full text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] font-bold border border-white/5 shadow-sm">
                End-to-end encrypted
              </div>
            </div>
          ) : (
            <ChatContainer />
          )}
        </div>
      </div>
    </div>
  );
}