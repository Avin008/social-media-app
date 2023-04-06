const CommentBox = () => {
  return (
    <div className="border w-full rounded-md h-full">
      <input
        className="w-full h-full rounded-md bg-transparent px-2"
        type="text"
        placeholder="comment here..."
      />
    </div>
  );
};

export default CommentBox;
