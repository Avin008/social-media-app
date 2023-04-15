"use client";
import CreatePostCard from "@/components/CreatePostCard";
import FeedCard from "@/components/FeedCard";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const UserFeedsPage = () => {
  const { token, _id } = useAuthStore((store) => store);
  const { data: postData, isLoading } = useQuery(
    ["posts"],
    async () => {
      const res = await axios.post(
        "http://localhost:3333/posts",
        token
      );
      return res.data;
    }
  );

  const { data: userData } = useQuery(
    ["user"],
    async () => {
      const res = await axios.post(
        "http://localhost:3333/user",
        {
          _id,
        }
      );
      return res.data;
    },
    {
      select: (data) => {
        return data.data.userData;
      },
    }
  );

  return (
    <div className="text-white m-2 flex flex-col gap-2">
      <CreatePostCard userData={userData} />
      {!isLoading &&
        postData?.data.posts.map((post: Post) => (
          <FeedCard key={post._id} post={post} />
        ))}
    </div>
  );
};

export default UserFeedsPage;
