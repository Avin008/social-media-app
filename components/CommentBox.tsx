const CommentBox = () => {
  return (
    <div className="border flex w-full rounded-md h-full">
      <input
        className="w-full h-full rounded-md bg-transparent px-2"
        type="text"
        placeholder="comment here..."
      />
      <button className="mx-2">💬</button>
    </div>
  );
};

export default CommentBox;
