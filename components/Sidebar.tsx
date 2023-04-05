const Sidebar = () => {
  return (
    <ul className="pb-1 space-y-2 text-white cursor-pointer bg-[#1E1F23] flex flex-col">
      <li className="hover:bg-brand rounded-l-md cursor-pointer transition-all p-3">
        🔥 Feeds
      </li>
      <li className="hover:bg-brand rounded-l-md cursor-pointer transition-all p-3">
        🤔 Explore
      </li>
      <li className="hover:bg-brand rounded-l-md cursor-pointer transition-all p-3">
        📺 Profile
      </li>
      <li className="hover:bg-brand rounded-l-md cursor-pointer transition-all p-3">
        ☀️ Logout
      </li>
    </ul>
  );
};

export default Sidebar;
