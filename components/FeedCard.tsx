import Avatar from "./Avatar";
import UserInfo from "./userInfo";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import UserComment from "./UserComment";

const FeedCard = ({
  feedData,
}: {
  feedData: {
    userPhoto: string;
    username: string;
    fullName: string;
    text: string;
    postImg?: string;
  };
}) => {
  return (
    <div className="border p-4 border-gray-600 h-fit relative rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Avatar image={feedData.userPhoto} />
          <UserInfo
            username={feedData.username}
            fullName={feedData.fullName}
          />
        </div>
        <div>
          <span className="text-xs bg-[#282C37] px-2 py-1 rounded-full">
            --
          </span>
        </div>
      </div>
      <div className="">{feedData.text}</div>
      {feedData.postImg && (
        <PostImage postImg={feedData.postImg} />
      )}
      <PostActions />
      <UserComment
        comment={{
          comment: "this is just a comment",
          username: "gohan",
        }}
      />
    </div>
  );
};

export default FeedCard;
