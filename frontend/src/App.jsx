import React from "react";

import Login from "./pages/LogIn.page.jsx";
import SideBar from "./components/SideBar.jsx";
import SignUpPage from "./pages/SignUp.page.jsx";
import  SettingPage  from "./pages/Settings.page.jsx";
import  ProfilePage  from "./pages/Profile.page.jsx";
import  HomePage  from "./pages/Home.page.jsx";

import {Routes , Route} from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}