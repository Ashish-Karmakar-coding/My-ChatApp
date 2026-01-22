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
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isvalidInput()) login(data);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/5 relative group">
            <div className="absolute inset-0 bg-[var(--color-accent)] opacity-10 blur-xl rounded-full" />
            <MessageSquare className="w-10 h-10 text-[var(--color-accent)] relative z-10" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Welcome Back</h1>
          <p className="text-[var(--text-secondary)] mt-2 font-medium">Log in to continue your conversations</p>
        </div>

        <div className="bg-[var(--bg-secondary)] p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-[var(--color-accent)] transition-colors" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bg-primary)] border border-white/5 rounded-2xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px) font-bold text-[var(--text-secondary)] uppercase tracking-widest px-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-[var(--color-accent)] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-[var(--bg-primary)] border border-white/5 rounded-2xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full vibrant-orange-btn py-4 mt-4 flex items-center justify-center gap-2 "
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-[var(--text-secondary)] text-sm font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;