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
        queryClient.invalidateQueries(["user"]);
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
        <div className="w-[90%] border rounded-md">
          <textarea
            className="w-full p-2 resize-none border-none outline-none bg-transparent"
            name="text"
            id=""
            value={post?.text}
            placeholder="Write your post here..."
            onChange={inputHandler}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end p-2 gap-2">
        <input
          className="hidden"
          type="file"
          name=""
          id=""
        />
        <button
          onClick={() => updatePost()}
          className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full"
        >
          update post
        </button>
        <button
          onClick={closeUpdatePostHandler}
          className="text-brand text-sm border border-brand px-4 font-medium shadow-md py-1 rounded-full"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default UpdatePostCard;
