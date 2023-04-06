import Image from "next/image";

const FeedCard = ({
  feedData,
}: {
  feedData: {
    userPhoto: string;
    username: string;
    fullName: string;
    text: string;
    postImg?: string;
  };
}) => {
  return (
    <div className="border p-4 border-gray-600 h-fit relative rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-10 border h-10 relative rounded-full">
            <Image
              className="rounded-full"
              src={feedData.userPhoto}
              alt=""
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">
              {feedData.fullName}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              @{feedData.username}
            </span>
          </div>
        </div>
        <div>
          <span className="text-xs bg-[#282C37] px-2 py-1 rounded-full">
            --
          </span>
        </div>
      </div>
      <div className="">{feedData.text}</div>
      {feedData.postImg && (
        <div className="relative h-80 rounded-md border border-gray-500 w-full">
          <Image
            className="rounded-md"
            src={feedData.postImg}
            alt=""
            fill
          />
        </div>
      )}
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
    </div>
  );
};

export default FeedCard;
