import { useState, useRef } from "react";
import { useAuthStore } from "../lib/authStore.js";
import avatar from "../assets/avatar.jpg"; // Assuming you have a default avatar image
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const fileInputRef = useRef(null);

  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleLogout = () => {
    logout();
  };

   const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // File type validation
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    toast(
  "Only JPEG, PNG, and WebP files are allowed.",
  {
    duration: 6000,
  }
);
    return;
  }

  // File size validation (2MB limit) - PREVENTS 413 ERROR
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    alert('File size must be less than 2MB. Please compress your image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const base64Image = reader.result;
    setSelectedImg(base64Image);
    
    try {
      await updateProfile({ profilePicture: base64Image });
    } catch (error) {
      if (error.response?.status === 413) {
        alert('Image too large. Please use a smaller file.');
      } else {
        alert('Upload failed. Please try again.');
      }
      // Reset on error
      setSelectedImg(null);
    }
  };
  reader.readAsDataURL(file);
};

  return (
    <div className="min-h-[92dvh] bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 text-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center">
          {/* Profile Picture with Camera Button */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePicture || avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
    absolute bottom-0 right-0
    bg-gray-700 hover:bg-gray-600
    w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
    transition-all duration-200
    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
  `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          {/* Username */}
          <h2 className="text-2xl font-bold mb-1">{authUser.username}</h2>
          <p className="text-gray-400 mb-4 text-center">Online</p>

          {/* User Info */}
          <div className="w-full bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Email:</span>
              <span className="font-medium">{authUser.email}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Username:</span>
              <span className="font-medium">{authUser.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Status:</span>
              <span className="font-medium text-green-400">Active</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 w-full">
            <button
              className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-full px-6 py-2 font-semibold transition"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}