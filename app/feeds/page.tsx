"use client";
import CreatePostCard from "@/components/CreatePostCard";
import FeedCard from "@/components/FeedCard";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const UserFeedsPage = () => {
  const { token, _id } = useAuthStore((store) => store);
  const { data: postData, isLoading: isPostDataLoading } =
    useQuery(["posts"], async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post`,
        token
      );
      return res.data.data.postData as PostType[];
    });

  const { data: userData, isLoading: isUserDataLoading } =
    useQuery(["user"], async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user`,
        {
          _id,
          token: token,
        }
      );
      return res.data.data.userData as UserType;
    });

  return (
    <div className="text-white m-2 flex flex-col gap-2">
      {!isUserDataLoading && (
        <CreatePostCard
          key={userData?._id}
          userData={userData}
        />
      )}
      {!isPostDataLoading &&
        postData?.map((post: PostType) => (
          <FeedCard key={post?._id} post={post} />
        ))}
    </div>
  );
};

export default UserFeedsPage;
