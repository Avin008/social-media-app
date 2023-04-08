import Avatar from "./Avatar";
import UserInfo from "./userInfo";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import UserComment from "./UserComment";

const FeedCard = ({ post }: { post: Post }) => {
  return (
    <div className="border p-4 border-gray-600 h-fit relative rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Avatar image={post.userPhoto} />
          <UserInfo
            username={post.username}
            fullName={post.fullname}
          />
        </div>
        <div>
          <span className="text-xs bg-[#282C37] px-2 py-1 rounded-full">
            --
          </span>
        </div>
      </div>
      <div className="">{post.post_text}</div>
      {/* {post.postImg && (
        <PostImage postImg={post.p} />
      )} */}
      <PostActions />
      {/* <UserComment
        comment={{
          comment: "this is just a comment",
          username: "gohan",
        }}
      /> */}
    </div>
  );
};

export default FeedCard;
