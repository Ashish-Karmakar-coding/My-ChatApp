import { Link } from "react-router-dom";
import { useAuthStore } from "../lib/authStore.js";
import { MessageSquare, User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const { logout, authUser } = useAuthStore();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="modern-glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">
              Chatity
            </span>
          </Link>

          {/* Actions */}
          {authUser && (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Profile</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
              >
                <Settings className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-45" />
                <span className="hidden sm:inline text-sm font-medium">Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="btn-modern !py-1.5 !px-3 sm:!px-4 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
