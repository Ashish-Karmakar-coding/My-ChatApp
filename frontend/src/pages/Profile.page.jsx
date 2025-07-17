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

  // Function to compress image
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

 const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('📁 Original file:', {
        name: file.name,
        size: file.size,
        type: file.type
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    // Validate file size (5MB limit before compression)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }

    try {
        // Compress the image
        const compressedBase64 = await compressImage(file, 400, 0.6); // Smaller size, lower quality
        
        console.log('📦 Compressed image info:', {
            originalSize: file.size,
            compressedSize: Math.round((compressedBase64.length * 3) / 4),
            base64Length: compressedBase64.length,
            preview: compressedBase64.substring(0, 50) + '...'
        });
        
        setSelectedImg(compressedBase64);
        
        console.log('🚀 Sending to server...');
        const result = await updateProfile({ profilePicture: compressedBase64 });
        console.log('✅ Server response:', result);
        
    } catch (error) {
        console.error('💥 Error processing image:', error);
    }
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