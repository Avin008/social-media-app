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
        queryClient.invalidateQueries(["explore"]);
      },
    }
  );

  return (
    <div className="flex h-full w-full items-center rounded-md  border focus-within:border focus-within:border-brand">
      <input
        className="h-full w-full rounded-md bg-transparent p-1 px-2 outline-none"
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
