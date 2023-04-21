"use client";
import Avatar from "./Avatar";
import UserInfo from "./userInfo";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import UserComment from "./UserComment";
import {
  useQueryClient,
  useMutation,
  useQuery,
} from "react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useState } from "react";
import UpdatePostCard from "./UpdatePostCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const FeedCard = ({ post }: { post: PostType }) => {
  const [togglePostOptions, setTogglePostOptions] =
    useState<boolean>(false);

  const [toggleEditPostModal, setToggleEditPostModal] =
    useState<boolean>(false);

  const closeUpdatePostHandler = () => {
    setToggleEditPostModal((prev) => !prev);
  };

  const { token, _id } = useAuthStore((store) => store);

  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/delete`,
        { token, post }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["explore"]);
        setTogglePostOptions(false);
      },
    }
  );

  const {
    data: commentsData,
    isLoading: isCommentsDataLoading,
  } = useQuery(["comments"], async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/post/comments`,
      { token, post }
    );
    return res.data.data.comments as CommentType[];
  });

  const { mutate: unfollow } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/unfollow`,
        { token, followedUser: post?.author }
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["suggestions"]);
      },
    }
  );

  return (
    <div className="relative flex h-fit flex-col gap-3 rounded-md border border-gray-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Avatar image={post?.author?.profilePic} />
          <UserInfo
            username={post?.author?.username}
            fullname={post?.author?.fullname}
            authorId={post?.author?._id}
          />
        </div>
        <div className="relative">
          <span>
            <button
              className="rounded-full p-1 hover:bg-[#282C37] active:bg-[#282C50]"
              onClick={() =>
                setTogglePostOptions((prev) => !prev)
              }
            >
              <AiOutlineEllipsis size={20} />
            </button>
          </span>
          {togglePostOptions && (
            <div className="absolute right-0 top-6 z-30 w-36">
              <ul className="flex flex-col gap-2 rounded-md bg-[#282C37] py-1 text-xs">
                {post?.author?._id == _id && (
                  <li>
                    <button
                      className="w-full p-1 px-2 hover:bg-brand"
                      onClick={() =>
                        closeUpdatePostHandler()
                      }
                    >
                      edit post
                    </button>
                  </li>
                )}
                {post?.author?._id === _id && (
                  <li>
                    <button
                      className="w-full p-1 hover:bg-brand"
                      onClick={() => deletePost()}
                    >
                      remove post
                    </button>
                  </li>
                )}
                {post?.author?._id !== _id && (
                  <li>
                    <button
                      className="w-full p-1 px-2 hover:bg-brand"
                      onClick={() => {
                        unfollow();
                      }}
                    >
                      unfollow
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="">{post?.text}</div>
      {post?.img && <PostImage postImg={post?.img} />}
      <PostActions post={post} comment={commentsData} />
      <div className="flex flex-col gap-2">
        <span className="text-sm">Comments</span>
        {commentsData
          ?.filter(
            (comment: CommentType) =>
              comment?.post_id === post?._id
          )
          .map((comment: CommentType) => (
            <UserComment
              key={comment?._id}
              comment={comment}
            />
          ))}
      </div>
      {toggleEditPostModal && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[45%] rounded-md bg-[#282C37] p-2">
            <UpdatePostCard
              closeUpdatePostHandler={
                closeUpdatePostHandler
              }
              post={post}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
