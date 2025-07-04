import React from "react";

import Login from "./pages/LogIn.page.jsx";
import SideBar from "./components/SideBar.jsx";
import SignUpPage from "./pages/SignUp.page.jsx";

export default function App() {
  return (
    <>
      <SideBar />
      <Login />
      <SignUpPage />
    </>
  );
}