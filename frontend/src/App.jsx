import {use, useEffect,useState} from "react";

import LogInPage from "./pages/LogIn.page.jsx";
import SideBar from "./components/SideBar.jsx";
import SignUpPage from "./pages/SignUp.page.jsx";
import  SettingPage  from "./pages/Settings.page.jsx";
import  ProfilePage  from "./pages/Profile.page.jsx";
import  HomePage  from "./pages/Home.page.jsx";

import { Loader } from "lucide-react";

import {Routes , Route, Navigate} from "react-router-dom";

import {useAuthStore} from "./lib/authStore.js";

import {Toaster} from "react-hot-toast";

export default function App() {

  const {authUser,checkAuth , isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth()
  },[checkAuth]) 

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <>
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