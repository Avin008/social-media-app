import Image from "next/image";

const SearchedUser = ({
  user,
}: {
  user: { username: string; name: string; photo: string };
}) => {
  return (
    <div className="h-16 flex items-center gap-2">
      <div className="relative h-10 w-14">
        <Image src={user.photo} fill alt="" />
      </div>
      <div className="flex flex-col text-white">
        <span>{user.name}</span>
        <span className="text-gray-400 text-sm">
          @{user.username}
        </span>
      </div>
    </div>
  );
};

export default SearchedUser;
