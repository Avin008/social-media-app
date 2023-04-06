import Avatar from "./Avatar";
import CommentBox from "./CommentBox";

const PostActions = () => {
  return (
    <div className="flex items-center gap-2">
      <CommentBox />
      <button className="h-full w-10 text-2xl">❤️</button>
    </div>
  );
};

export default PostActions;
