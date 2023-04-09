"use client";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const UpdatePostCard = ({
  post: postData,
  closeUpdatePostHandler,
}: {
  post: Post;
  closeUpdatePostHandler: () => void;
}) => {
  const { token } = useAuthStore((store) => store);

  const [post, setUpdatePost] = useState(postData);

  const inputHandler = (
    e: React.SyntheticEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.currentTarget;

    setUpdatePost((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  // const { isLoading, data, mutate } = useMutation(
  //   async () => {
  //     return fetch("http://localhost:3080/post", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         token: token,
  //         postText: post.postText,
  //       }),
  //     }).then((res) => res.json());
  //   },
  //   {
  //     onSuccess: (data: { message: string; data: any }) => {
  //       setPost({ postText: "" });
  //       if (data.message === "post created successfully") {
  //         toast.success(data.message);
  //       }
  //     },
  //     onError: () => {
  //       toast.error("something went wrong");
  //     },
  //   }
  // );

  return (
    <div className="h-fit p-2">
      <div className="flex items-center">
        <div className="w-[10%]">
          <Avatar image="/social.svg" />
        </div>
        <div className="w-[90%] border rounded-md">
          <textarea
            className="w-full p-2 resize-none border-none outline-none bg-transparent"
            name="post_text"
            id=""
            value={post.post_text}
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
          // onClick={() => toggleEditPostModal()}
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
