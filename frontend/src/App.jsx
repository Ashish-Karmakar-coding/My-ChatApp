import {useEffect} from "react";

import LogInPage from "./pages/LogIn.page.jsx";
import SignUpPage from "./pages/SignUp.page.jsx";
import  SettingPage  from "./pages/Settings.page.jsx";
import  ProfilePage  from "./pages/Profile.page.jsx";
import  HomePage  from "./pages/Home.page.jsx";
import Navbar from "./components/Navbar.jsx";


import { Loader } from "lucide-react";

import {Routes , Route, Navigate} from "react-router-dom";

import {useAuthStore} from "./lib/authStore.js";

import {Toaster} from "react-hot-toast";

export default function App() {

  const {authUser,checkAuth , isCheckingAuth ,onlineUsers} = useAuthStore();
  useEffect(() => {
    checkAuth()
  },[]); 

  console.log("Online Users:", onlineUsers);

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader className="w-10 h-10 animate-spin text-purple-700 " />
      </div>
    )
  }

  return (
    <>
    <Navbar/>
     <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/signup"/>} />
        <Route path="/login" element={!authUser ?<LogInPage />: <Navigate to="/"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage />: <Navigate to="/signup"/>} />
      </Routes>

    <Toaster/>

    </>
  );
}