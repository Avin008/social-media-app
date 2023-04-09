"use client";
import CreatePostCard from "@/components/CreatePostCard";
import FeedCard from "@/components/FeedCard";
import { useQuery } from "react-query";

const UserFeedsPage = () => {
  const { data: postData, isLoading } = useQuery(
    ["posts"],
    async () => {
      return fetch(`${process.env.NEXT_PUBLIC_URL}/post`, {
        method: "GET",
      }).then((res) => res.json());
    }
  );

  return (
    <div className="text-white m-2 flex flex-col gap-2">
      <CreatePostCard />
      {!isLoading &&
        postData?.data?.map((post: Post) => (
          <FeedCard
            key={post.post_id}
            post={{ ...post, userPhoto: "/social.svg" }}
          />
        ))}
    </div>
  );
};

export default UserFeedsPage;
