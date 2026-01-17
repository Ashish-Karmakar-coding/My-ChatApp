import { useState } from "react";
import { useAuthStore } from "../lib/authStore.js";
import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const isvalidInput = () => {
    if (!data.email.trim()) return toast.error("Email is required");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return toast.error("Invalid email format");

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = isvalidInput();
    if (success === true) {
      login(data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-1/4 size-64 bg-purple-500/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 size-64 bg-cyan-500/10 blur-[100px] rounded-full" />

      <div className="w-full max-w-md glass-card p-8 sm:p-12 relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
              <MessageSquare className="size-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight italic">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2 font-medium">Sign in to continue the wave</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                placeholder="you@aurora.com"
                className="input-modern pl-12"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input-modern pl-12 pr-12"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-modern !py-4 shadow-xl mt-4"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Authorizing...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-slate-400 text-sm font-medium">
          New to the aurora?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300 font-black tracking-wider transition-colors"
          >
            CREATE ACCOUNT
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogInPage;