const Sidebar = () => {
  return (
    <ul className="h-fit text-white space-y-4 sticky top-14">
      <li className="hover:bg-gray-500 bg-gray-500 p-3 cursor-pointer">
        🔥 Feeds
      </li>
      <li className="hover:bg-gray-500 p-3 cursor-pointer">
        🤔 Explore
      </li>
      <li className="hover:bg-gray-500 p-3 cursor-pointer">
        📺 Profile
      </li>
      <li className="hover:bg-gray-500 p-3 cursor-pointer">
        ☀️ Logout
      </li>
    </ul>
  );
};

export default Sidebar;
