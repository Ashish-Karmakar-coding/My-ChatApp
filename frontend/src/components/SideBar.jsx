import React from "react";

function SideBar() {
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col border-r border-gray-700">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {/* Example user buttons, replace with dynamic users later */}
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700 hover:bg-purple-700 transition">
                    <img
                        src="https://i.pravatar.cc/40?u=1"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                    />
                    <div className="flex flex-col items-start">
                        <span className="font-semibold">Username</span>
                        <span className="text-xs text-gray-400">user@email.com</span>
                    </div>
                </button>
                
                {/* Add more static user buttons as needed */}
            </div>
            
        </aside>
    );
}

export default SideBar;