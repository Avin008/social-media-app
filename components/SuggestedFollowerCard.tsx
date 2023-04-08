"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "./Avatar";
import { useMutation } from "react-query";

const SuggestedFollowerCard = ({
  suggestedUser,
}: {
  suggestedUser: {
    photo: string;
    username: string;
    fullname: string;
    _id: string;
  };
}) => {
  const token = useAuthStore((store) => store.token);

  const { mutate } = useMutation(
    async () => {
      return fetch("http://localhost:3080/user/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          followedUserId: suggestedUser._id,
        }),
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <div className="h-14 rounded-md flex gap-3 justify-between items-center px-2">
      <div className="flex gap-3">
        <Avatar image="/social.svg" />
        <div className="flex flex-col leading-5">
          <span className="text-white">
            {suggestedUser.fullname}
          </span>
          <span className="text-gray-400 text-sm">
            @{suggestedUser.username}
          </span>
        </div>
      </div>
      <button
        onClick={() => mutate()}
        className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full"
      >
        follow
      </button>
    </div>
  );
};

export default SuggestedFollowerCard;
