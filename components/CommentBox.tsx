"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useMutation } from "react-query";

const CommentBox = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState<string>("");

  const token = useAuthStore((store) => store.token);

  const { mutate } = useMutation(
    async () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_URL}/post/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            postId: post.post_id,
            comment: comment,
          }),
        }
      );
    },
    {
      onSuccess: () => {
        setComment("");
      },
    }
  );

  return (
    <div className="focus-within:border focus-within:border-brand border flex w-full  items-center rounded-md h-full">
      <input
        className="w-full h-full outline-none rounded-md bg-transparent px-2 p-1"
        type="text"
        placeholder="comment here..."
        value={comment}
        onChange={(
          e: React.SyntheticEvent<HTMLInputElement>
        ) => setComment(e.currentTarget.value)}
      />
      <button
        onClick={() => mutate()}
        className="mx-2 text-xs text-brand"
      >
        post
      </button>
    </div>
  );
};

export default CommentBox;
