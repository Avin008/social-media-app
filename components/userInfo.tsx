import { useRouter } from "next/navigation";

const UserInfo = ({
  username,
  fullname,
  authorId,
}: {
  username: string | undefined;
  fullname: string | undefined;
  authorId: string | undefined;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <span
        onClick={() =>
          router.push(`/feeds/profile/${authorId}`)
        }
        className="text-sm hover:cursor-pointer hover:text-brand"
      >
        {fullname}
      </span>
      <span className="text-xs font-medium text-gray-400">
        @{username}
      </span>
    </div>
  );
};

export default UserInfo;
