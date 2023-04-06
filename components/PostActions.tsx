const PostActions = () => {
  return (
    <div className="h-10 text-sm gap-3 flex items-center justify-around rounded-md border-gray-600">
      <button className="bg-[#282C37] px-5 py-1 rounded-md shadow-sm">
        👍 Like
      </button>
      <button className="bg-[#282C37] px-5 py-1 rounded-md shadow-sm">
        💬 Comment
      </button>
      <button className="bg-[#282C37] px-5 py-1 rounded-md shadow-sm">
        ☀️ Share
      </button>
      <button className="bg-[#282C37] px-5 py-1 rounded-md shadow-sm">
        Save
      </button>
    </div>
  );
};

export default PostActions;
