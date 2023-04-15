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
import { useState, useEffect } from "react";
import UpdatePostCard from "./UpdatePostCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const FeedCard = ({ post }: { post: Post }) => {
  const [togglePostOptions, setTogglePostOptions] =
    useState<boolean>(false);

  const [toggleEditPostModal, setToggleEditPostModal] =
    useState<boolean>(false);

  const closeUpdatePostHandler = () => {
    setToggleEditPostModal((prev) => !prev);
  };

  const { token, _id } = useAuthStore((store) => store);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, mutate } = useMutation(
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
        setTogglePostOptions(false);
      },
    }
  );

  const {
    data: comments,
    isLoading: isCommentsDataLoading,
  } = useQuery(["comments"], async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/post/comments`,
      { token, post }
    );
    return res.data;
  });

  return (
    <div className="border p-4 text-white border-gray-600 h-fit relative rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Avatar image={post.author.profilePic} />
          <UserInfo
            username={post.author.username}
            fullName={post.author.fullname}
          />
        </div>
        <div className="relative">
          <span>
            <button
              onClick={() =>
                setTogglePostOptions((prev) => !prev)
              }
            >
              <AiOutlineEllipsis size={25} />
            </button>
          </span>
          {togglePostOptions && (
            <div className="absolute z-30 w-48 top-6 right-0">
              <ul className="text-xs flex flex-col gap-2 bg-[#282C37] py-1 rounded-md">
                {post.author._id == _id && (
                  <li>
                    <button
                      className="px-2 w-full p-1 hover:bg-brand"
                      onClick={() =>
                        closeUpdatePostHandler()
                      }
                    >
                      edit post
                    </button>
                  </li>
                )}
                {post.author._id === _id && (
                  <li>
                    <button
                      className="p-1 hover:bg-brand w-full"
                      onClick={() => mutate()}
                    >
                      remove post
                    </button>
                  </li>
                )}
                {post.author._id !== _id && (
                  <li>
                    <button
                      className="px-2 w-full p-1 hover:bg-brand"
                      onClick={() => mutate()}
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
      <div className="">{post.text}</div>
      {post.img && <PostImage postImg={post.img} />}
      <PostActions
        post={post}
        comment={comments?.data.comments}
      />
      {comments?.data.comments.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm">Comments</span>
          {comments.data.comments
            .filter((x: any) => x.post_id === post._id)
            .map((comment: any) => (
              <UserComment
                key={comment._id}
                comment={comment}
              />
            ))}
        </div>
      )}
      {toggleEditPostModal && (
        <div className="fixed z-50 top-0 flex items-center justify-center bottom-0 left-0 right-0 bg-black/60">
          <div className="w-[45%] bg-[#282C37] p-2 rounded-md">
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
