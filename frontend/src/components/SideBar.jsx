import { use, useEffect } from "react";
import useChatStore from "../lib/useChatStore.js";
import SidebarSkeleton from "../skeletons/SideBarSkele.jsx";

function SideBar() {
  const { users, getUsers, setSelectedUser, selectedUser, isLoadingUsers } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoadingUsers) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="bg-gray-800 text-white w-64 flex flex-col border-r border-gray-700 sticky top-0 h-[92dvh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {/* Example user buttons, replace with dynamic users later */}
        {users.map((user) => (
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700 hover:bg-purple-700 transition"
          onClick={() => setSelectedUser(user)}>
            <img
              src={user.profilePicture || "/avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
            />
            <div className="flex flex-col items-start">
              <span className="font-semibold">{user.username}</span>
            </div>
          </button>
        ))}
        {/* ...repeat for other users... */}
      </div>
      <style>
        {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    background: #2d3748;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2d3748;
                    border-radius: 8px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #2d3748 #2d3748;
                }
                `}
      </style>
    </aside>
  );
}

export default SideBar;
