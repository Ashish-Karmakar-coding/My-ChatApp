import { useState } from "react";
import { useAuthStore } from "../lib/authStore.js";
import { Link } from "react-router-dom";
import { Loader, Loader2, Eye, EyeOff, Lock, Mail, MessageSquare, ShowerHead } from "lucide-react";
import {toast} from "react-hot-toast";

import backgroundImg from "../assets/background.jpg";


function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const  [data, setData]  = useState({
    email: "",
    password: "",
  });

  const {isLoggingIn , Login} = useAuthStore()

  const isvalidInput = () => {
    if(!data.email.trim()) return toast.error("Email is required");
    if(!data.password.trim()) return toast.error("Password is required");
    if(data.password.length < 6) return toast.error("Password must be at least 6 characters long");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return toast.error("Invalid email format");

    return true;
  };

const handleLogin = (e)=>{
  e.preventDefault();
  const success =  isvalidInput()
  if (success === true) {
    Login(data)
  }
  return
}

  return (
    <>
      <div className="flex items-center justify-center min-h-[92dvh] bg-gray-900 px-4">
        <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left side: Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center md:text-left">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2 text-center md:text-left">
              Log in to get started
            </p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-12"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              <button 
                type="submit" 
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            
            <p className="text-gray-400 text-sm mt-6 text-center md:text-left">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Right side: Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={backgroundImg}
              alt="Signup"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;