import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "./Avatar";

const UserCard = ({ userData }: { userData: any }) => {
  const userId = useAuthStore((store) => store.userId);

  return (
    <div className="flex justify-between border items-center px-4 bg-[#282C37] border-gray-600 rounded-md h-40">
      <div className="flex gap-3 items-center">
        <Avatar
          image="/social.svg"
          height="100px"
          width="100px"
        />
        <div className="flex flex-col text-white leading-5">
          <span>{userData.fullname}</span>
          <span className="text-xs text-gray-400">
            @{userData.username}
          </span>
          <div className="flex text-xs gap-3 mt-2">
            <span>0 Posts</span>
            <span>
              {userData.followers.length} Followers
            </span>
            <span>
              {userData.following.length} Following
            </span>
          </div>
        </div>
      </div>
      <div>
        {userData._id === userId ? (
          <button className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full">
            edit profile
          </button>
        ) : (
          <button className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full">
            follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
