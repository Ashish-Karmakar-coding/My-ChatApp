import { useState, useRef } from "react";
import { useAuthStore } from "../lib/authStore.js";
import avatar from "../assets/avatar.jpg";
import { Camera, LogOut, User, Mail, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

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
      } catch (error) {
        toast.error('Upload failed. Please try again.');
        setSelectedImg(null);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[92dvh] flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full glass-card p-8 sm:p-10 relative overflow-hidden">
        {/* Aurora Glow */}
        <div className="absolute top-0 right-0 size-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />

        <div className="flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePicture || avatar}
                alt="Profile"
                className="size-32 sm:size-40 rounded-3xl object-cover ring-4 ring-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-2 -right-2
                  bg-gradient-to-tr from-cyan-500 to-purple-500
                  w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer
                  transition-all duration-300 shadow-xl hover:scale-110 active:scale-95
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
              <h2 className="text-3xl font-black text-white tracking-tight">{authUser.username}</h2>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <span className="size-2 bg-cyan-400 rounded-full animate-pulse" />
                <p className="text-xs text-cyan-400/80 font-bold uppercase tracking-widest">Active Member</p>
              </div>
            </div>
          </div>

          {/* User Info Grid */}
          <div className="w-full space-y-3 mt-10">
            <div className="modern-glass rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-colors">
              <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold text-slate-200">{authUser.email}</p>
              </div>
            </div>

            <div className="modern-glass rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-colors">
              <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-purple-400">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Username</p>
                <p className="text-sm font-semibold text-slate-200">@{authUser.username}</p>
              </div>
            </div>

            <div className="modern-glass rounded-2xl p-4 flex items-center gap-4">
              <div className="size-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Account Status</p>
                <p className="text-sm font-semibold text-cyan-400">Verified & Secure</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            className="w-full btn-modern !py-4 mt-8 shadow-purple-500/10 hover:shadow-purple-500/20"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Sign Out Account
          </button>
        </div>
      </div>
    </div>
  );
}