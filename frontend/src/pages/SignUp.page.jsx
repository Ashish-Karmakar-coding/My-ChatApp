import { useState } from "react";

export default function SignUpPage() {

    const {data,setData} = useState({
        fullName:"",
        email:"",
        password:""
    })

    isvalidInput = ()=>{}


  return (
       <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white text-center md:text-left">Create Account</h2>
          <p className="text-gray-400 mt-2 text-center md:text-left">Sign up to get started</p>
          <form className="mt-8 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-700 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-400 text-sm mt-6 text-center md:text-left">
            Already have an account?{" "}
            <a href="#" className="text-purple-500 hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>

        {/* Right side: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://pin.it/21XSApM5D"
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
