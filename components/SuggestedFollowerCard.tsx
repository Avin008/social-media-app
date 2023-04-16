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
    <div className="h-14 rounded-md flex gap-3 justify-between items-center px-2">
      <div className="flex gap-3">
        <Avatar image={suggestedUser?.profilePic} />
        <div className="flex flex-col leading-5">
          <span className="text-white">
            {suggestedUser?.fullname}
          </span>
          <span className="text-gray-400 text-sm">
            @{suggestedUser?.username}
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
