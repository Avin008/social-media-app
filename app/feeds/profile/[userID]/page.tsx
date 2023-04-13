"use client";
import FeedCard from "@/components/FeedCard";
import UserCard from "@/components/UserCard";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";

const ProfilePage = () => {
  const pathname = usePathname();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  return (
    <div className="p-2 flex flex-col gap-2">
      {!isLoading && <UserCard data={data.data} />}
      {!isLoading && (
        <>
          {data.data.postData.map((x: any) => (
            <FeedCard post={x} key={x._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
