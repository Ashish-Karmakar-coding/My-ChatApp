import { Users } from "lucide-react";

const SidebarSkeleton = () => {

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
     <div>Loading...</div>
    </aside>
  );
};

export default SidebarSkeleton;