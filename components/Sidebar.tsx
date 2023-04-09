"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const userId = useAuthStore((store) => store.userId);

  return (
    <ul className="pb-1 space-y-2 text-white cursor-pointer bg-[#1E1F23] flex flex-col">
      <Link
        className={`hover:bg-[#282C37] rounded-l-md cursor-pointer transition-all p-3 ${
          pathname === "/feeds" && "bg-[#282C37]"
        }`}
        href="/feeds"
      >
        🔥 Feeds
      </Link>

      <Link
        className={`hover:bg-[#282C37] rounded-l-md cursor-pointer transition-all p-3 ${
          pathname === "/feeds/explore" && "bg-[#282C37]"
        }`}
        href="/feeds/explore"
      >
        🤔 Explore
      </Link>

      <Link
        className={`hover:bg-[#282C37] rounded-l-md cursor-pointer transition-all p-3 ${
          pathname === `/feeds/profile/${dynamicPath}` &&
          "bg-[#282C37]"
        }`}
        href={`/feeds/profile/${userId}`}
      >
        📺 Profile
      </Link>
      <li
        className={`hover:bg-[#282C37] rounded-l-md cursor-pointer transition-all p-3`}
      >
        ☀️ Logout
      </li>
    </ul>
  );
};

export default Sidebar;
