"use client";
import FeedCard from "@/components/FeedCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const pathname = usePathname();
  const userId = useAuthStore((store) => store._id);

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

  if (isUserDataLoading) return <LoadingSpinner />;

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
            {userData?.userData?._id === userId ? (
              <span className="text-xs text-white">
                you haven&apos;t posted anything yet!
              </span>
            ) : (
              <span className="text-xs text-white">
                user haven&apos;t posted anything yet!
              </span>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default ProfilePage;
