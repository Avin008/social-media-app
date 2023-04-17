"use client";
import FeedCard from "@/components/FeedCard";
import UserCard from "@/components/UserCard";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const pathname = usePathname();

  const dynamicPath = pathname.split("/").slice(-1).join();

  const { data: userData, isLoading: isUserDataLoading } =
    useQuery(["users"], async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user`,
        { _id: dynamicPath }
      );

      return res.data.data as {
        userData: UserType;
        postData: PostType[];
      };
    });

  if (isUserDataLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader color="white" size={25} />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-2">
      <UserCard
        userData={userData?.userData}
        postData={userData?.postData}
      />
      <>
        {userData?.postData?.length ? (
          userData?.postData?.map((post: PostType) => (
            <FeedCard post={post} key={post?._id} />
          ))
        ) : (
          <div className="flex h-40 items-center justify-center">
            <span className="text-xs text-white">
              you haven&apos;t posted anything yet!
            </span>
          </div>
        )}
      </>
    </div>
  );
};

export default ProfilePage;
