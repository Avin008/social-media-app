"use client";
import axios from "axios";
import { useQuery } from "react-query";
import FeedCard from "@/components/FeedCard";

const ExplorePage = () => {
  const { data: postData, isLoading: isPostDataLoading } =
    useQuery(["posts"], async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/posts`
      );
      return res.data.data.posts as PostType[];
    });

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <span className="text-white font-medium px-4">
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
