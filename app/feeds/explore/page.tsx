"use client";
import axios from "axios";
import { useQuery } from "react-query";
import FeedCard from "@/components/FeedCard";

const ExplorePage = () => {
  const { data: postData, isLoading: isPostDataLoading } =
    useQuery(["explore"], async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/explore`
      );
      return res.data.data.posts as PostType[];
    });

  return (
    <div className="flex flex-col gap-2 p-2">
      <div>
        <span className="px-4 font-medium text-white">
          # Explore
        </span>
      </div>
      {!isPostDataLoading && (
        <>
          {postData?.map((post: PostType) => (
            <FeedCard post={post} key={post?._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExplorePage;
