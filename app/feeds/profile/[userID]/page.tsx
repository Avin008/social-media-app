"use client";
import FeedCard from "@/components/FeedCard";
import UserCard from "@/components/UserCard";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const pathname = usePathname();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const { data: userData, isLoading: isUserDataLoading } =
    useQuery(["user"], async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user`,
        { _id: dynamicPath }
      );

      return res.data.data as {
        userData: UserType;
        postData: PostType[];
      };
    });

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <span className="text-white font-medium px-4">
          # Profile
        </span>
      </div>
      {!isUserDataLoading && (
        <UserCard
          userData={userData?.userData}
          postData={userData?.postData}
        />
      )}
      {!isUserDataLoading && (
        <>
          {userData?.postData?.map((post: PostType) => (
            <FeedCard post={post} key={post?._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
