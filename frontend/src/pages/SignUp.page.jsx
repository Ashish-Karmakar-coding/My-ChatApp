import { useState } from "react";
import { useAuthStore } from "../lib/authStore.js";
import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff, User, Mail, Lock, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const isvalidInput = () => {
    if (!data.username.trim()) return toast.error("Username is required");
    if (!data.email.trim()) return toast.error("Email is required");
    if (!data.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (isvalidInput()) signup(data);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-4">

      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <MessageSquare className="w-8 h-8 text-[var(--color-accent)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create Account</h1>
      </div>

      <div className="w-full max-w-md bg-[var(--bg-secondary)] p-8 rounded-lg shadow-lg border border-[var(--glass-border)] border-opacity-10">
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-[var(--bg-primary)] border border-[var(--glass-border)] border-opacity-20 rounded-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)]" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[var(--bg-primary)] border border-[var(--glass-border)] border-opacity-20 rounded-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-[var(--bg-primary)] border border-[var(--glass-border)] border-opacity-20 rounded-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-[var(--text-secondary)] text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--color-accent)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}