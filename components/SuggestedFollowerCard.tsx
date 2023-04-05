import Image from "next/image";

const SuggestedFollowerCard = ({
  suggestedUser,
}: {
  suggestedUser: {
    photo: string;
    username: string;
    fullName: string;
  };
}) => {
  return (
    <div className="h-14 rounded-md flex gap-3 justify-between items-center px-2">
      <div className="flex gap-3">
        <div className="relative h-10 w-10">
          <Image src={suggestedUser.photo} alt="" fill />
        </div>
        <div className="flex flex-col leading-5">
          <span className="text-white">
            {suggestedUser.fullName}
          </span>
          <span className="text-gray-400 text-sm">
            @{suggestedUser.username}
          </span>
        </div>
      </div>
      <button className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full">
        follow
      </button>
    </div>
  );
};

export default SuggestedFollowerCard;
