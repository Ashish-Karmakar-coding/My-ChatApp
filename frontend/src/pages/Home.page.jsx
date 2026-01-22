import { useEffect } from "react";
import SideBar from "../components/SideBar.jsx";
import useChatStore from "../lib/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";
import { MessageSquare } from "lucide-react";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  // Handle back button on mobile by deselecting user
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Ensure sidebar is visible on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar - Hidden on mobile if chat is open */}
      <div className={`w-full md:w-[400px] lg:w-[450px] sidebar-container transition-all duration-300 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
        <SideBar />
      </div>

      {/* Chat Area - Hidden on mobile if no chat is open */}
      <div className={`flex-1 flex flex-col h-full bg-[#222e35] relative ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        {!selectedUser ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-tertiary)] border-b-8 border-[var(--color-accent)]">
            <div className="w-32 h-32 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6 animate-pulse">
              <MessageSquare className="w-16 h-16 text-[var(--color-accent)]" />
            </div>
            <h1 className="text-3xl font-light text-[var(--text-primary)] mb-4">
              WhatsApp for Web
            </h1>
            <p className="text-[var(--text-secondary)] text-sm max-w-md">
              Send and receive messages without keeping your phone online.
              <br />
              Use WhatsApp on up to 4 linked devices and 1 phone.
            </p>
          </div>
        ) : (
          <ChatContainer />
        )}
      </div>
    </div>
  );
}