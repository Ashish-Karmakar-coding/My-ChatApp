// import HomeSkele from "../skeletons/homeSkele.jsx";
import SideBar from "../components/SideBar.jsx";
import Header from "../components/header.jsx";

export default function HomePage() {
  return (
    <div className="flex bg-gray-900 min-h-[92dvh]">
      <SideBar />
      {/* <HomeSkele /> */}
        <Header />
       
    </div>
  );
}
