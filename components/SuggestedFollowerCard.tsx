"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "./Avatar";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const SuggestedFollowerCard = ({
  suggestedUser,
}: {
  suggestedUser: UserType;
}) => {
  const token = useAuthStore((store) => store.token);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/follow`,
        { token, followedUser: { _id: suggestedUser?._id } }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["posts"]);
        toast.success(
          `you are now following ${data.data.followedUser.fullname}`
        );
      },
      onError: (data) => {
        toast.error("something went wrong");
      },
    }
  );

  return (
    <div className="flex h-14 items-center justify-between gap-3 rounded-md px-2">
      <div className="flex gap-3">
        <Avatar image={suggestedUser?.profilePic} />
        <div className="flex flex-col leading-5">
          <span className="text-white">
            {suggestedUser?.fullname}
          </span>
          <span className="text-sm text-gray-400">
            @{suggestedUser?.username}
          </span>
        </div>
      </div>
      <button
        onClick={() => mutate()}
        className="rounded-full bg-brand px-4 py-1 text-sm font-medium text-white shadow-md"
      >
        follow
      </button>
    </div>
  );
};

export default SuggestedFollowerCard;
