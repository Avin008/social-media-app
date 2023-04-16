"use client";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const UpdatePostCard = ({
  post: postData,
  closeUpdatePostHandler,
}: {
  post: PostType;
  closeUpdatePostHandler: () => void;
}) => {
  const { token } = useAuthStore((store) => store);

  const [post, setUpdatePost] = useState(postData);

  const queryClient = useQueryClient();

  const inputHandler = (
    e: React.SyntheticEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.currentTarget;

    setUpdatePost((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    isLoading: isUpdatePostLoading,
    mutate: updatePost,
  } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/update`,
        { token, post }
      );
      return res.data;
    },
    {
      onSuccess: (data: { message: string; data: any }) => {
        setUpdatePost((prev: any) => ({
          ...prev,
          post_text: "",
        }));
        closeUpdatePostHandler();
        toast.success(data.message);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["explore"]);
      },
      onError: () => {
        toast.error("something went wrong");
      },
    }
  );

  return (
    <div className="h-fit p-2">
      <div className="flex items-center">
        <div className="w-[10%]">
          <Avatar image={post?.author?.profilePic} />
        </div>
        <div className="w-[90%] rounded-md border">
          <textarea
            className="w-full resize-none border-none bg-transparent p-2 outline-none"
            name="text"
            id=""
            value={post?.text}
            placeholder="Write your post here..."
            onChange={inputHandler}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-2 p-2">
        <input
          className="hidden"
          type="file"
          name=""
          id=""
        />
        <button
          onClick={() => updatePost()}
          className="rounded-full bg-brand px-4 py-1 text-sm font-medium text-white shadow-md"
        >
          update post
        </button>
        <button
          onClick={closeUpdatePostHandler}
          className="rounded-full border border-brand px-4 py-1 text-sm font-medium text-brand shadow-md"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default UpdatePostCard;
