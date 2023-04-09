"use client";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const CreatePostCard = () => {
  const [post, setPost] = useState<{ postText: string }>({
    postText: "",
  });

  const inputHandler = (
    e: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const { token } = useAuthStore((store) => store);

  const router = useRouter();

  const { isLoading, data, mutate } = useMutation(
    async () => {
      return fetch(`${process.env.NEXT_PUBLIC_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          postText: post.postText,
        }),
      }).then((res) => res.json());
    },
    {
      onSuccess: (data: { message: string; data: any }) => {
        setPost({ postText: "" });
        if (data.message === "post created successfully") {
          toast.success(data.message);
        }
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
          <Avatar image="/social.svg" />
        </div>
        <div className="w-[90%] border rounded-md">
          <textarea
            className="w-full p-2 resize-none border-none outline-none bg-transparent"
            name="postText"
            id=""
            value={post.postText}
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
