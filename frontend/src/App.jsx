import React from "react";

import Login from "./pages/LogIn.page.jsx";
import SideBar from "./components/SideBar.jsx";
import SignUpPage from "./pages/SignUp.page.jsx";

import {Routes , Route} from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}