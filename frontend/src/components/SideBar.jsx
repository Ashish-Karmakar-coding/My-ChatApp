import { useEffect } from "react";
import { Users } from "lucide-react";
import useChatStore from "../lib/useChatStore.js";
import { useAuthStore } from "../lib/authStore.js";
import SidebarSkeleton from "../skeletons/SideBarSkele.jsx";
import avatar from "../assets/avatar.jpg";

function SideBar() {
  const { users, getUsers, setSelectedUser, selectedUser, isLoadingUsers } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoadingUsers) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      <aside className="bg-gray-800 text-white w-64 flex flex-col border-r border-gray-700 sticky top-0 h-[92dvh]">
        {/* Users header */}
        <div className="p-4 pb-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-300" />
            <span className="text-sm font-medium text-gray-300">Users</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {users?.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <p>No users available</p>
            </div>
          ) : (
            users?.map((user) => (
              <button
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedUser?._id === user._id
                    ? "bg-purple-700 ring-1 ring-purple-500"
                    : "bg-gray-700 hover:bg-purple-600"
                }`}
                key={user._id}
                onClick={() => setSelectedUser(user)}
                aria-label={`Chat with ${user.username}`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePicture || avatar}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                    onError={(e) => {
                      e.target.src = avatar;
                    }}
                  />
                  {onlineUsers?.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
                      aria-label="Online"
                    />
                  )}
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="font-semibold text-sm truncate w-full text-left">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400 truncate w-full text-left">
                    {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #2d3748;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4a5568 #2d3748;
        }
      `}</style>
    </>
  );
}

export default SideBar;