"use client";
import UserCard from "@/components/UserCard";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const pathname = usePathname();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const { data, isLoading } = useQuery(
    ["user"],
    async () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: dynamicPath }),
        }
      ).then((res) => res.json());
    }
  );

  return (
    <div className="p-2">
      {!isLoading && data.data && (
        <UserCard userData={data.data} />
      )}
    </div>
  );
};

export default ProfilePage;
