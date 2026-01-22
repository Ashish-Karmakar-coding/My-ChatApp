

import { useState } from "react";
import { useAuthStore } from "../lib/authStore.js";
import avatar from "../assets/avatar.jpg";
import { Camera, LogOut, User, Mail, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {

  const { logout, authUser, updateProfile, isUpdatingProfile, deleteAccount } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP files are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      try {
        await updateProfile({ profilePicture: base64Image });
      } catch {
        toast.error('Upload failed. Please try again.');
        setSelectedImg(null);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full bg-[var(--bg-secondary)] p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/5">
        <div className="flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePicture || avatar}
                alt="Profile"
                className="size-32 sm:size-40 rounded-[2.5rem] object-cover ring-4 ring-[var(--bg-primary)] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-2 -right-2
                  bg-[var(--color-accent)]
                  w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer
                  transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 hover:bg-[var(--color-accent-hover)]
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-6 h-6 text-white" />
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
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{authUser.username}</h2>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <span className="size-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                <p className="text-xs text-[var(--color-accent)] font-bold uppercase tracking-widest">Active Member</p>
              </div>
            </div>
          </div>

          {/* User Info Grid */}
          <div className="w-full space-y-3 mt-10">
            <div className="bg-[var(--bg-primary)] rounded-[1.5rem] p-4 flex items-center gap-4 group hover:bg-[var(--bg-primary)]/80 transition-colors border border-white/5">
              <div className="size-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{authUser.email}</p>
              </div>
            </div>

            <div className="bg-[var(--bg-primary)] rounded-[1.5rem] p-4 flex items-center gap-4 group hover:bg-[var(--bg-primary)]/80 transition-colors border border-white/5">
              <div className="size-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Username</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">@{authUser.username}</p>
              </div>
            </div>

            <div className="bg-[var(--bg-primary)] rounded-[1.5rem] p-4 flex items-center gap-4 border border-white/5">
              <div className="size-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Account Status</p>
                <p className="text-sm font-semibold text-[var(--color-accent)]">Verified & Secure</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            className="w-full vibrant-orange-btn py-4 mt-8 flex items-center justify-center gap-2 "
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Sign Out Account
          </button>

          <button
            className="w-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-2xl py-4 mt-4 flex items-center justify-center gap-2 transition-all active:scale-95"
            onClick={async () => {
              if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                await deleteAccount();
              }
            }}
          >
            <LogOut size={18} className="rotate-180" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}