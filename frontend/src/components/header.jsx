import useChatStore from "../lib/useChatStore.js";
import avatar from "../assets/avatar.jpg"; // Assuming you have a default avatar image
import { X } from "lucide-react";

export default function Header() {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="p-2 border-b border-base-300 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePicture || avatar}
                alt={selectedUser.username}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-white">{selectedUser.username}</h3>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}
