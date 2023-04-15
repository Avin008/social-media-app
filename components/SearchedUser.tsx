import Image from "next/image";
import Avatar from "./Avatar";

const SearchedUser = ({ user }: { user: any }) => {
  return (
    <div className="h-16 flex items-center gap-2 px-4">
      <Avatar image={user.profilePic} />
      <div className="flex flex-col text-white">
        <span>{user.fullname}</span>
        <span className="text-gray-400 text-sm">
          @{user.username}
        </span>
      </div>
    </div>
  );
};

export default SearchedUser;
