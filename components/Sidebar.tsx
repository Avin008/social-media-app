"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  MdOutlineLogout,
  MdPersonOutline,
  MdOutlineExplore,
  MdExplore,
  MdHome,
  MdOutlineHome,
  MdPerson,
} from "react-icons/md";

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
        className={`hover:bg-[#282C37] flex items-center gap-2 rounded-l-md cursor-pointer transition-all p-3 ${
          pathname === "/feeds" && "bg-[#282C37]"
        }`}
        href="/feeds"
      >
        {pathname === "/feeds" ? (
          <MdHome size={20} />
        ) : (
          <MdOutlineHome size={20} />
        )}{" "}
        Feeds
      </Link>

      <Link
        className={`hover:bg-[#282C37] flex items-center gap-2 rounded-l-md cursor-pointer transition-all p-3 ${
          pathname === "/feeds/explore" && "bg-[#282C37]"
        }`}
        href="/feeds/explore"
      >
        {pathname === "/feeds/explore" ? (
          <MdExplore size={20} />
        ) : (
          <MdOutlineExplore size={20} />
        )}{" "}
        Explore
      </Link>

      <Link
        className={`hover:bg-[#282C37] flex items-center gap-2 rounded-l-md cursor-pointer transition-all p-3 ${
          pathname === `/feeds/profile/${dynamicPath}` &&
          "bg-[#282C37]"
        }`}
        href={`/feeds/profile/${_id}`}
      >
        {pathname === `/feeds/profile/${dynamicPath}` ? (
          <MdPerson size={20} />
        ) : (
          <MdPersonOutline size={20} />
        )}{" "}
        Profile
      </Link>
      <li
        className={`hover:bg-[#282C37] text-red-500 font-medium flex items-center gap-2 rounded-l-md cursor-pointer transition-all p-3`}
        onClick={() => {
          removeAuth();
          router.push("/");
          toast.success("user successfully logged out");
        }}
      >
        <MdOutlineLogout color="red" size={20} />{" "}
        <span>Logout</span>
      </li>
    </ul>
  );
};

export default Sidebar;
