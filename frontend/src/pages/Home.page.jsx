import HomeSkele from "../skeletons/HomeSkele.jsx";
import SideBar from "../components/SideBar.jsx";
import useChatStore from "../lib/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-80px)] px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-7xl h-[calc(100vh-160px)] flex overflow-hidden glass-card shadow-2xl">
        <SideBar />
        {!selectedUser ? <HomeSkele /> : <ChatContainer />}
      </div>
    </div>
  );
}