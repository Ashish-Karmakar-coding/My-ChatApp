import { useEffect, useState } from "react";
import { Users, Search, MoreVertical, LogOut } from "lucide-react";
import useChatStore from "../lib/useChatStore.js";
import { useAuthStore } from "../lib/authStore.js";
import SidebarSkeleton from "../skeletons/SideBarSkele.jsx";
import avatar from "../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { users, getUsers, setSelectedUser, selectedUser, isLoadingUsers } = useChatStore();
  const { onlineUsers, logout, authUser } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoadingUsers) return <SidebarSkeleton />;

  return (
    <aside className="h-full flex flex-col w-full">
      {/* WhatsApp Header */}
      <div className="h-[var(--header-height)] bg-[var(--bg-secondary)] flex items-center justify-between px-4 py-2 border-r border-[var(--glass-border)]">
        <div
          className="relative group cursor-pointer"
          onClick={() => navigate('/profile')}
          title="Go to Profile"
        >
          <img
            src={authUser?.profilePicture || avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[var(--color-accent)] transition-all"
          />
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
        </div>

        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <button onClick={logout} className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors text-red-400" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[var(--bg-primary)] p-2">
        <div className="flex items-center bg-[var(--bg-secondary)] rounded-lg px-4 py-1.5">
          <Search className="w-5 h-5 text-[var(--text-secondary)] min-w-[20px]" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-transparent border-none focus:outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] px-4 py-1 text-sm h-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-[var(--glass-border)] opacity-20"></div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[var(--bg-primary)]">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-[var(--text-secondary)] mt-8 text-sm">
            <p>No chats found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-[var(--bg-secondary)] transition-colors border-b border-[var(--glass-border)] border-opacity-10 ${selectedUser?._id === user._id ? "bg-[var(--bg-secondary)]" : ""
                }`}
            >
              <div className="relative">
                <img
                  src={user.profilePicture || avatar}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {onlineUsers?.includes(user._id) && ( // Online indicator suitable for WhatsApp logic? Maybe just text
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-primary)]"></span>
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-[var(--text-primary)] truncate text-base">{user.username}</h3>
                  <span className="text-xs text-[var(--text-secondary)]">Yesterday</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate">
                  {onlineUsers?.includes(user._id) ? "Online" : "Hey there! I am using WhatsApp."}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}

export default SideBar;