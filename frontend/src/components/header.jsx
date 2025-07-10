export default function Header() {
  // Static user data for now
  const user = {
    _id: "static123",
    avatar: "https://i.pravatar.cc/40?u=static123",
    fullName: "John Doe",
    email: "john.doe@email.com",
  };

  return (
    <header className="w-full bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center gap-4 shadow relative top-0 ">
      <img
        src={user.avatar}
        alt={user.fullName}
        className="w-12 h-12 rounded-full object-cover border-2 border-purple-600"
      />
      <div>
        <h2 className="text-lg font-semibold text-white">{user.fullName}</h2>
        <span className="text-xs text-gray-400">{user.email}</span>
      </div>
    </header>
  );
}