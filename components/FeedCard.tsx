const FeedCard = () => {
  return (
    <div className="border border-gray-600 h-60 relative rounded-md">
      <div className="h-10 text-sm absolute bottom-2 right-3 gap-3 flex items-center justify-around rounded-md border-gray-600">
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
          ---
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
