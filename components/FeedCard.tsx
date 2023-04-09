import Avatar from "./Avatar";
import UserInfo from "./userInfo";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import UserComment from "./UserComment";
import { useMutation } from "react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useState } from "react";

const FeedCard = ({ post }: { post: Post }) => {
  const [togglePostOptions, setTogglePostOptions] =
    useState<boolean>(false);

  const { token, userId } = useAuthStore((store) => store);

  const { data, isLoading, isError, mutate } = useMutation(
    async () => {
      return fetch("http://localhost:3080/post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          postId: post.post_id,
        }),
      }).then((res) => res.json());
    }
  );

  return (
    <div className="border p-4 border-gray-600 h-fit relative rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Avatar image={post.userPhoto} />
          <UserInfo
            username={post.username}
            fullName={post.fullname}
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
            <div className="absolute w-48 top-5 right-0">
              <ul className="text-xs flex flex-col gap-2 bg-[#282C37] py-1 rounded-md">
                <li>
                  <button
                    className="p-1 hover:bg-brand w-full"
                    onClick={() => mutate()}
                  >
                    remove post
                  </button>
                </li>
                <li>
                  <button
                    className="px-2 w-full p-1 hover:bg-brand"
                    onClick={() => mutate()}
                  >
                    unfollow
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="">{post.post_text}</div>
      {post.postImg && <PostImage postImg={post.postImg} />}
      <PostActions post={post} />
      {post.comments.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm">Comments</span>
          {post.comments.map((comment) => (
            <UserComment comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedCard;
