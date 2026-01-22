import { useEffect, useState } from "react";
import { Users, Search, MoreVertical, LogOut } from "lucide-react";
import useChatStore from "../lib/useChatStore.js";
import { useAuthStore } from "../lib/authStore.js";
import SidebarSkeleton from "../skeletons/SidebarSkele.jsx";
import avatar from "../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
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
      <div className="premium-header border-r border-white/5">
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

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a] px-3 py-4 flex flex-col gap-3">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-[var(--text-secondary)] mt-8 text-sm">
            <p>No chats found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full flex items-center gap-4 px-4 py-3.5 rounded-[2.5rem] transition-all duration-500 relative group
                ${selectedUser?._id === user._id
                  ? "bg-[var(--bg-secondary)] shadow-2xl scale-[1.02] border border-[var(--color-accent)]/20"
                  : "bg-[var(--bg-primary)]/40 hover:bg-[var(--bg-secondary)]/60 hover:scale-[1.01] border border-transparent hover:border-white/5"}
              `}
            >
              {/* Highlight bar for selected user */}
              {selectedUser?._id === user._id && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[var(--color-accent)] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
              )}

              <div className="relative shrink-0">
                <img
                  src={user.profilePicture || avatar}
                  alt={user.username}
                  className="w-13 h-13 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[var(--color-accent)]/30 transition-all duration-500 shadow-md"
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a] shadow-sm animate-pulse"></span>
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[var(--text-primary)] truncate text-base tracking-tight group-hover:text-white transition-colors">{user.username}</h3>
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-40">Just now</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm truncate text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors opacity-80">
                    {onlineUsers?.includes(user._id) ? <span className="text-[var(--color-accent)] font-semibold">Active now</span> : "Hey there! I am using WhatsApp."}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;