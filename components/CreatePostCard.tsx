"use client";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const CreatePostCard = ({
  userData,
}: {
  userData: UserType;
}) => {
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

  const queryClient = useQueryClient();

  const {
    isLoading: isCreatingPostLoading,
    mutate: createPost,
  } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/create`,
        { token, post }
      );
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("post created");
        setPost({ text: "" });
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["users"]);
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
          <Avatar image={userData?.profilePic} />
        </div>
        <div className="w-[90%] rounded-md border">
          <textarea
            className="w-full resize-none border-none bg-transparent p-2 outline-none"
            name="text"
            id=""
            value={post.text}
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
          accept=".png,.jpg,.jpeg"
        />
        <button
          className="rounded-full bg-brand px-4 py-1 text-sm font-medium text-white shadow-md"
          disabled={isCreatingPostLoading}
          onClick={() => createPost()}
        >
          {isCreatingPostLoading ? "posting" : "post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
