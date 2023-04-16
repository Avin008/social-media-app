import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "./Avatar";
import UpdateUserProfileCard from "./UpdateProfileCard";
import { useState } from "react";

const UserCard = ({
  userData,
  postData,
}: {
  userData: UserType;
  postData: PostType[] | undefined;
}) => {
  const userId = useAuthStore((store) => store._id);

  const [
    toggleUpdateProfileCard,
    setToggleUpdateProfileCard,
  ] = useState(false);

  const toggleProfileCardHandler = () => {
    setToggleUpdateProfileCard((prev) => !prev);
  };

  return (
    <div className="flex justify-between border items-center px-4 bg-[#282C37] border-gray-600 rounded-md h-40">
      <div className="flex gap-3 items-center">
        <Avatar
          image={userData?.profilePic}
          height="80px"
          width="80px"
        />
        <div className="flex flex-col text-white leading-5">
          <span>{userData?.fullname}</span>
          <span className="text-xs text-gray-400">
            @{userData?.username}
          </span>
          <div className="flex text-xs gap-3 mt-2">
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
            className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full"
            onClick={toggleProfileCardHandler}
          >
            edit profile
          </button>
        ) : (
          <button className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full">
            follow
          </button>
        )}
      </div>
      {toggleUpdateProfileCard && (
        <div className="fixed top-0 bottom-0 flex items-center justify-center left-0 right-0 bg-black/20 z-50">
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
