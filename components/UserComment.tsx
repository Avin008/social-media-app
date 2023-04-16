import Avatar from "./Avatar";

const UserComment = ({
  comment,
}: {
  comment: CommentType;
}) => {
  return (
    <div className="items-center flex gap-1">
      <div className="w-[10%]">
        <Avatar image={comment?.author?.profilePic} />
      </div>
      <div className="w-[90%] flex flex-col leading-4">
        <span className="text-xs text-gray-400">
          @{comment?.author?.fullname}
        </span>
        <span className="text-xs">{comment?.comment}</span>
      </div>
    </div>
  );
};

export default UserComment;
