"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const { _id, removeAuth } = useAuthStore(
    (store) => store
  );

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
        href={`/feeds/profile/${_id}`}
      >
        📺 Profile
      </Link>
      <li
        className={`hover:bg-[#282C37] rounded-l-md cursor-pointer transition-all p-3`}
        onClick={() => {
          removeAuth();
          router.push("/");
          toast.success("user successfully logged out");
        }}
      >
        ☀️ Logout
      </li>
    </ul>
  );
};

export default Sidebar;
