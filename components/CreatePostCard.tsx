"use client";
import { useRef } from "react";
import Avatar from "./Avatar";

const CreatePostCard = () => {
  return (
    <div className="h-fit p-2">
      <div className="flex items-center">
        <div className="w-[10%]">
          <Avatar image="/social.svg" />
        </div>
        <div className="w-[90%] border rounded-md">
          <textarea
            className="w-full p-2 resize-none border-none outline-none bg-transparent"
            name=""
            id=""
            placeholder="Write your post here..."
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
        <button className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full">
          post
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
