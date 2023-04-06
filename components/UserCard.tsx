import Avatar from "./Avatar";

const UserCard = () => {
  return (
    <div className="flex justify-between border items-center px-4 bg-[#282C37] border-gray-600 rounded-md h-40">
      <div className="flex gap-3 items-center">
        <Avatar
          image="/social.svg"
          height="100px"
          width="100px"
        />
        <div className="flex flex-col text-white leading-5">
          <span>Avinash Mahananda</span>
          <span className="text-xs text-gray-400">
            @avinash008
          </span>
        </div>
      </div>
      <div>
        <button className="text-white text-sm bg-brand px-4 font-medium shadow-md py-1 rounded-full">
          follow
        </button>
      </div>
    </div>
  );
};

export default UserCard;
