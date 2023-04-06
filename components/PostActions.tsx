import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import PostEngagementCount from "./PostEngagementCount";

const PostActions = () => {
  return (
    <div className="flex items-center gap-2">
      <PostEngagementCount
        likesCount={0}
        commentCount={0}
      />
      <CommentBox />
      <button className="h-full w-10 text-2xl">❤️</button>
    </div>
  );
};

export default PostActions;
