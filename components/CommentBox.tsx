const CommentBox = () => {
  return (
    <div className="border flex w-full  items-center rounded-md h-full">
      <input
        className="w-full h-full rounded-md bg-transparent px-2 p-1"
        type="text"
        placeholder="comment here..."
      />
      <button className="mx-2">💬</button>
    </div>
  );
};

export default CommentBox;
