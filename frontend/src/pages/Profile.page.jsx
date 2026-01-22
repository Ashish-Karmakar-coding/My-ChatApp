

import { useState } from "react";
import { useAuthStore } from "../lib/authStore.js";
import avatar from "../assets/avatar.jpg";
import { Camera, LogOut, User, Mail, ShieldCheck, ArrowLeft, Calendar, MessageSquare, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout, authUser, updateProfile, isUpdatingProfile, deleteAccount } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

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

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Recently';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent)]/3 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full bg-[var(--bg-secondary)]/80 backdrop-blur-xl p-4 sm:p-8 rounded-[2.5rem] relative shadow-2xl border border-white/10 animate-slide-up">

        {/* Profile Header with Back Button */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/5 rounded-full transition-all duration-300 text-[var(--text-secondary)] hover:text-white hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Profile</h1>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative group">
              {/* Animated ring around avatar */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-[var(--color-accent)] to-[#fbd38d] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

              <img
                src={selectedImg || authUser.profilePicture || avatar}
                alt="Profile"
                className="size-28 sm:size-32 rounded-[2.5rem] object-cover ring-4 ring-[var(--bg-primary)] shadow-2xl transition-all duration-500 group-hover:scale-[1.05] group-hover:ring-[var(--color-accent)]/30 relative z-10"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-2 -right-2
                  bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)]
                  w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer
                  transition-all duration-300 shadow-xl hover:scale-110 active:scale-95
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  z-20
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
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">{authUser.username}</h2>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <span className="size-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                <p className="text-xs text-[var(--color-accent)] font-bold uppercase tracking-widest">Active Member</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-3 mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-primary)]/50 rounded-[1.5rem] p-4 border border-white/5 hover:border-[var(--color-accent)]/20 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Member Since</p>
              </div>
              <p className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{memberSince}</p>
            </div>

            <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-primary)]/50 rounded-[1.5rem] p-4 border border-white/5 hover:border-[var(--color-accent)]/20 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" />
                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Status</p>
              </div>
              <p className="text-lg font-bold text-[var(--color-accent)] group-hover:scale-105 transition-transform">Online</p>
            </div>
          </div>

          {/* User Info Grid */}
          <div className="w-full space-y-3 mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div
              className="bg-[var(--bg-primary)]/60 backdrop-blur-sm rounded-[1.5rem] p-4 flex items-center gap-4 group hover:bg-[var(--bg-primary)]/80 transition-all duration-300 border border-white/5 hover:border-[var(--color-accent)]/20 cursor-pointer"
              onClick={() => copyToClipboard(authUser.email, 'Email')}
            >
              <div className="size-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{authUser.email}</p>
              </div>
              <div className="text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                {copiedField === 'Email' ? <Check size={18} /> : <Copy size={18} />}
              </div>
            </div>

            <div
              className="bg-[var(--bg-primary)]/60 backdrop-blur-sm rounded-[1.5rem] p-4 flex items-center gap-4 group hover:bg-[var(--bg-primary)]/80 transition-all duration-300 border border-white/5 hover:border-[var(--color-accent)]/20 cursor-pointer"
              onClick={() => copyToClipboard(authUser.username, 'Username')}
            >
              <div className="size-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Username</p>
                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">@{authUser.username}</p>
              </div>
              <div className="text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                {copiedField === 'Username' ? <Check size={18} /> : <Copy size={18} />}
              </div>
            </div>


          </div>

          {/* Action Buttons */}
          <button
            className="w-full vibrant-orange-btn py-4 mt-6 flex items-center justify-center gap-2 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Sign Out Account
          </button>

          <button
            className="w-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 rounded-2xl py-4 mt-4 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}