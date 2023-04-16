"use client";
import CreatePostCard from "@/components/CreatePostCard";
import FeedCard from "@/components/FeedCard";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const UserFeedsPage = () => {
  const { token, _id } = useAuthStore((store) => store);

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

  const { data: postData, isLoading: isPostDataLoading } =
    useQuery(
      ["posts"],
      async () => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/post`,
          { token: token }
        );
        return res.data.data.posts as PostType[];
      },
      {
        select: (postData: any) => {
          const folowingUserPostAndUserPost =
            postData?.filter(
              (post: any) =>
                userData?.following.includes(
                  post.author?._id
                ) || post?.author?._id === _id
            );

          return folowingUserPostAndUserPost.sort(
            (a: any, b: any) => b?.createdAt - a?.createdAt
          );
        },
      }
    );

  return (
    <div className="m-2 flex flex-col gap-2 text-white">
      {!isUserDataLoading && (
        <CreatePostCard
          key={userData?._id}
          userData={userData}
        />
      )}
      {!isPostDataLoading &&
        !isUserDataLoading &&
        postData?.map((post: PostType) => (
          <FeedCard key={post?._id} post={post} />
        ))}
    </div>
  );
};

export default UserFeedsPage;
