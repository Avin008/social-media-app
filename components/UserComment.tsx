import { useRouter } from "next/navigation";
import Avatar from "./Avatar";

const UserComment = ({
  comment,
}: {
  comment: CommentType;
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1">
      <div className="w-[10%]">
        <Avatar image={comment?.author?.profilePic} />
      </div>
      <div className="flex w-[90%] flex-col leading-4">
        <span
          onClick={() =>
            router.push(
              `/feeds/profile/${comment?.author?._id}`
            )
          }
          className="text-xs text-gray-400 hover:cursor-pointer hover:text-brand"
        >
          @{comment?.author?.fullname}
        </span>
        <span className="text-xs">{comment?.comment}</span>
      </div>
    </div>
  );
};

export default UserComment;
