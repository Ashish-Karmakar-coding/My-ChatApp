import { useState } from "react";

export default function VerticalNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  // Mock auth user - replace with your actual useAuthStore hook
  const authUser = { name: "John Doe" };
  
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logging out...");
    // Replace with your actual logout function
  };

  return (
    <nav className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 shadow-lg h-screen">
      {/* Logo */}
      <div className="mb-8 cursor-pointer">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6"
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
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Home/Chat */}
        <div className="group relative">
          <button className="w-10 h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
            </svg>
          </button>
          <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Chats
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 mt-auto">
        {/* Profile */}
        <div className="group relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            {authUser?.name?.charAt(0) || 'U'}
          </button>
          <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Profile
          </div>

          {/* Profile Dropdown */}
          {showDropdown && (
            <div className="absolute left-14 bottom-0 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">{authUser?.name}</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log("Profile clicked");
                  setShowDropdown(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </div>
              </button>
              
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log("Preferences clicked");
                  setShowDropdown(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Preferences
                </div>
              </button>
              
              <hr className="border-gray-200" />
              
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
}