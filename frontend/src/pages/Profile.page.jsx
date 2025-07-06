import { useRef } from "react";

export default function ProfilePage() {
    const fileInputRef = useRef(null);

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-gray-800 text-white rounded-2xl shadow-2xl p-8">
                <div className="flex flex-col items-center">
                    {/* Profile Picture with Camera Button */}
                    <div className="relative mb-4">
                        <img
                            src="https://i.pravatar.cc/150?img=13"
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover"
                        />
                        <button
                            type="button"
                            className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full shadow-lg border-2 border-white transition"
                            title="Change profile picture"
                            onClick={handleCameraClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4zM21 21H3v-2a4 4 0 014-4h10a4 4 0 014 4v2z"
                                />
                            </svg>
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>
                    {/* Username */}
                    <h2 className="text-2xl font-bold mb-1">Ashish Karmakar</h2>
                    <p className="text-gray-400 mb-4 text-center">Online</p>

                    {/* User Info */}
                    <div className="w-full bg-gray-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Email:</span>
                            <span className="font-medium">ashish@example.com</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Username:</span>
                            <span className="font-medium">@ashishk</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Status:</span>
                            <span className="font-medium text-green-400">Active</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 w-full">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-full px-6 py-2 font-semibold transition">
                            Edit Profile
                        </button>
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-full px-6 py-2 font-semibold transition">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}