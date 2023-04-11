"use client";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const CreatePostCard = () => {
  const [post, setPost] = useState<{ text: string }>({
    text: "",
  });

  const inputHandler = (
    e: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const { token } = useAuthStore((store) => store);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { isLoading, data, mutate } = useMutation(
    async () => {
      const res = await axios.post(
        "http://localhost:3333/post",
        { token, post }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success("post created");
        setPost({ text: "" });
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error) => {
        toast.error("something went wrong");
      },
    }
  );

  return (
    <div className="h-fit p-2">
      <div className="flex items-center">
        <div className="w-[10%]">
          <Avatar image="/social.svg" />
        </div>
        <div className="w-[90%] border rounded-md">
          <textarea
            className="w-full p-2 resize-none border-none outline-none bg-transparent"
            name="text"
            id=""
            value={post.text}
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
          accept=".png,.jpg,.jpeg"
        />
        <button
          onClick={() => mutate()}
          className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full"
        >
          post
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
