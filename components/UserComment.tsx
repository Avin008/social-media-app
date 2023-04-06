import Avatar from "./Avatar";

const UserComment = ({
  comment,
}: {
  comment: { username: string; comment: string };
}) => {
  return (
    <div className="items-center flex gap-1">
      <div className="w-[10%]">
        <Avatar image="/social.svg" />
      </div>
      <div className="w-[90%] flex flex-col leading-4">
        <span className="text-xs text-gray-400">
          @{comment.username}
        </span>
        <span className="text-xs">{comment.comment}</span>
      </div>
    </div>
  );
};

export default UserComment;
