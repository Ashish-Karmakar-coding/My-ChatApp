import HomeSkele from "../skeletons/homeSkele.jsx";
import SideBar from "../components/SideBar.jsx";
import useChatstore from "../lib/useChatStore.js";
import ChatContainer from "../components/chatContainer.jsx";

export default function HomePage() {

  const {selectedUser, getUsers, users} = useChatstore();

  console.log(selectedUser)

  return (
    <div className="flex bg-gray-900 min-h-[92dvh]">
      <SideBar />
      {!selectedUser ? <HomeSkele/>:<ChatContainer/>}
       
    </div>
  );
}