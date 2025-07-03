import React from "react";
import SideBar from "./components/SideBar";

function App() {
  console.log("App rendered");
  return (
    <>
      <div className="bg-gray-900 h-screen">
        <SideBar />
      </div>
    </>
  );
}

export default App;
