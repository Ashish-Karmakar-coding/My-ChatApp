import { useEffect } from "react";
import useChatStore from "../lib/useChatStore.js";
import { useAuthStore } from "../lib/authStore.js";
import SidebarSkeleton from "../skeletons/SideBarSkele.jsx";
import avatar from "../assets/avatar.jpg"; // Assuming you have a default avatar image
function SideBar() {
  const { users, getUsers, setSelectedUser, selectedUser, isLoadingUsers } =
    useChatStore();

  const { onlineUsers, } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoadingUsers) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="bg-gray-800 text-white w-64 flex flex-col border-r border-gray-700 sticky top-0 h-[92dvh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {/* Example user buttons, replace with dynamic users later */}
        {users.map((user) => (
          <button
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700 hover:bg-purple-700 transition 
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            key={user._id}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || avatar}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
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
