import HomeSkele from "../skeletons/homeSkele";
import SideBar from "../components/SideBar";

export default function HomePage() {
  return (
    <div className="flex bg-gray-900 min-h-[92dvh]">
      <SideBar />
      <HomeSkele />
    </div>
  );
}
