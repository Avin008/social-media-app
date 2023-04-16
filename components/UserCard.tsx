import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "./Avatar";
import UpdateUserProfileCard from "./UpdateProfileCard";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const UserCard = ({
  userData,
  postData,
}: {
  userData: UserType;
  postData: PostType[] | undefined;
}) => {
  const { _id: userId, token } = useAuthStore(
    (store) => store
  );

  const [
    toggleUpdateProfileCard,
    setToggleUpdateProfileCard,
  ] = useState(false);

  const toggleProfileCardHandler = () => {
    setToggleUpdateProfileCard((prev) => !prev);
  };

  const queryClient = useQueryClient();

  const { mutate: follow } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/follow`,
        { token, followedUser: userData }
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["suggestions"]);
      },
    }
  );

  return (
    <div className="flex h-40 items-center justify-between rounded-md border border-gray-600 bg-[#282C37] px-4">
      <div className="flex items-center gap-3">
        <Avatar
          image={userData?.profilePic}
          height="80px"
          width="80px"
        />
        <div className="flex flex-col leading-5 text-white">
          <span>{userData?.fullname}</span>
          <span className="text-xs text-gray-400">
            @{userData?.username}
          </span>
          <div className="mt-2 flex gap-3 text-xs">
            <span>{postData?.length} Posts</span>
            <span>
              {userData?.followers.length} Followers
            </span>
            <span>
              {userData?.following.length} Following
            </span>
          </div>
        </div>
      </div>
      <div>
        {userData?._id === userId ? (
          <button
            className="rounded-full bg-brand px-4 py-1 text-sm font-medium text-white shadow-md"
            onClick={toggleProfileCardHandler}
          >
            edit profile
          </button>
        ) : userData?.followers.includes(userId) ? (
          <button className="rounded-full bg-brand px-4 py-1 text-sm font-medium text-white shadow-md">
            unfollow
          </button>
        ) : (
          <button
            className="rounded-full bg-brand px-4 py-1 text-sm font-medium text-white shadow-md"
            onClick={() => follow()}
          >
            follow
          </button>
        )}
      </div>
      {toggleUpdateProfileCard && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/20">
          <UpdateUserProfileCard
            userData={userData}
            toggleProfileCardHandler={
              toggleProfileCardHandler
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserCard;
