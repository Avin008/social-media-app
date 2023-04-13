"use client";
import UserCard from "@/components/UserCard";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const pathname = usePathname();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const { data, isLoading } = useQuery(
    ["user"],
    async () => {
      const res = await axios.post(
        "http://localhost:3333/user",
        { _id: dynamicPath }
      );

      return res.data;
    },
    {
      onSuccess: (data) => {
        console.log(data.data.postData);
      },
    }
  );

  return (
    <div className="p-2">
      {!isLoading && <UserCard data={data.data} />}
    </div>
  );
};

export default ProfilePage;
