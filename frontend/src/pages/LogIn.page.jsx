import { useState } from "react";
import { useAuthStore } from "../lib/authStore.js";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import {toast} from "react-hot-toast";

import backgroundImg from "../assets/background.jpg";


function LogInPage() {
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left side: Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center md:text-left">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2 text-center md:text-left">
              Log in to get started
            </p>
            <form onSubmit={handleLogin

            } className="mt-8 space-y-4">
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
                disabled = {isLoggingIn}
              >
                {
                  isLoggingIn? (
                    <>
                    <Loader className="size-5 animate-spin"/>
                    loading...
                    </>
                  ):(
                    "Log In"
                  )
              }
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
