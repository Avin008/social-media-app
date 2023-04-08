import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import PostEngagementCount from "./PostEngagementCount";

const PostActions = ({ post }: { post: Post }) => {
  return (
    <div className="flex items-center gap-2">
      <PostEngagementCount
        likesCount={post.likes.length}
        commentCount={post.comments.length}
      />
      <CommentBox post={post} />
      <button className="h-full w-10 text-2xl">❤️</button>
    </div>
  );
};

export default PostActions;
