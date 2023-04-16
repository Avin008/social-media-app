"use client";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const CommentBox = ({ post }: { post: PostType }) => {
  const [comment, setComment] = useState<string>("");

  const token = useAuthStore((store) => store.token);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/comments/create`,
        { post, token, comment: comment }
      );
    },
    {
      onSuccess: () => {
        setComment("");
        queryClient.invalidateQueries(["comments"]);
        queryClient.invalidateQueries(["user"]);
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
        className="mx-2 text-xs font-medium"
      >
        post
      </button>
    </div>
  );
};

export default CommentBox;
