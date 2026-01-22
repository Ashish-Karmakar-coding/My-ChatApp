import { useEffect } from "react";

import LogInPage from "./pages/LogIn.page.jsx";
import SignUpPage from "./pages/SignUp.page.jsx";
import SettingPage from "./pages/Settings.page.jsx";
import ProfilePage from "./pages/Profile.page.jsx";
import HomePage from "./pages/Home.page.jsx";

import { useThemeStore } from "./lib/themeStore.js";
import { useAuthStore } from "./lib/authStore.js";


import { Loader } from "lucide-react";

import { Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg-primary)]">
        <Loader className="w-10 h-10 animate-spin text-[var(--color-accent)]" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signup" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signup" />} />
      </Routes>

      <Toaster />
    </div>
  );
}