import useChatStore from "../lib/useChatStore.js";
import avatar from "../assets/avatar.jpg";
import { X } from "lucide-react";

export default function Header() {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="px-6 py-5 border-b border-white/5 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="size-12 rounded-2xl relative ring-2 ring-cyan-500/20 shadow-2xl p-0.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
              <img
                src={selectedUser.profilePicture || avatar}
                alt={selectedUser.username}
                className="rounded-2xl object-cover w-full h-full"
              />
              <span className="absolute -bottom-1 -right-1 size-4 bg-cyan-400 rounded-full ring-4 ring-[#020617]/50" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100 tracking-tight">
              {selectedUser.username}
            </h3>
            <p className="text-xs text-cyan-400/70 font-semibold tracking-wide uppercase">Active now</p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
