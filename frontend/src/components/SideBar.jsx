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
    <aside className="w-20 lg:w-72 flex flex-col h-full bg-white/5 backdrop-blur-3xl border-r border-white/5 transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-white/5 w-full flex items-center justify-center lg:justify-start gap-3">
        <Users className="w-6 h-6 text-cyan-400" />
        <span className="font-bold hidden lg:block tracking-tight text-slate-100">Messages</span>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        {users?.length === 0 ? (
          <div className="text-center text-slate-500 mt-8">
            <span className="hidden lg:inline text-sm">No users yet</span>
          </div>
        ) : (
          users?.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group ${selectedUser?._id === user._id
                ? "bg-white/10 ring-1 ring-white/10 shadow-lg shadow-cyan-500/5"
                : "hover:bg-white/5"
                }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePicture || avatar}
                  alt={user.username}
                  className="size-11 object-cover rounded-full ring-2 ring-transparent group-hover:ring-cyan-500/30 transition-all duration-300"
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute bottom-0.5 right-0.5 size-3 bg-cyan-400 rounded-full ring-2 ring-[#020617]" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-bold truncate text-slate-100 text-sm leading-tight">{user.username}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium italic">
                  {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  );
}

export default SideBar;