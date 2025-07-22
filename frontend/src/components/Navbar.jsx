import { Link } from "react-router-dom";
import { useAuthStore } from "../lib/authStore.js";

export default function Navbar() {
  const { logout ,authUser } = useAuthStore();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-purple-400"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
            />
          </svg>
          Chatity
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/profile" className="hover:text-purple-400 transition">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded-lg font-semibold transition"
          >
            Logout
          </button>{" "}
        </div>
      </div>
    </nav>
  );
}
