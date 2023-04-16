const PostEngagementCount = ({
  likesCount,
  commentCount,
}: {
  likesCount: number | undefined;
  commentCount: number | undefined;
}) => {
  return (
    <>
      <div className="text-center text-xs">
        {likesCount} likes
      </div>
      <div className="text-center text-xs">
        {commentCount} comments
      </div>
    </>
  );
};

export default PostEngagementCount;
