import HomeSkele from "../skeletons/homeSkele.jsx";
import SideBar from "../components/SideBar.jsx";
import Header from "../components/header.jsx";
import useChatstore from "../lib/useChatStore.js";
import messageComponent from "../components/message.jsx";

export default function HomePage() {

  const {selectedUser, getUsers, users} = useChatstore();

  

  return (
    <div className="flex bg-gray-900 min-h-[92dvh]">
      <SideBar />
       
    </div>
  );
}