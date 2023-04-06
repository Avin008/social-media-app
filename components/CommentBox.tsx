const CommentBox = () => {
  return (
    <div className="border w-full rounded-full h-full">
      <input
        className="w-full h-full rounded-full bg-transparent px-3"
        type="text"
        placeholder="comment here..."
      />
    </div>
  );
};

export default CommentBox;
