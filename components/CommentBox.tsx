"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useMutation } from "react-query";

const CommentBox = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState<string>("");

  const token = useAuthStore((store) => store.token);

  const { mutate } = useMutation(
    async () => {
      return fetch("http://localhost:3080/post/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          postId: post.post_id,
          comment: comment,
        }),
      });
    },
    {
      onSuccess: () => {
        setComment("");
      },
    }
  );

  return (
    <div className="border flex w-full  items-center rounded-md h-full">
      <input
        className="w-full h-full rounded-md bg-transparent px-2 p-1"
        type="text"
        placeholder="comment here..."
        value={comment}
        onChange={(
          e: React.SyntheticEvent<HTMLInputElement>
        ) => setComment(e.currentTarget.value)}
      />
      <button onClick={() => mutate()} className="mx-2">
        💬
      </button>
    </div>
  );
};

export default CommentBox;
