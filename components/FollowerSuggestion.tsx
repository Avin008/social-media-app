import Image from "next/image";
import SuggestedFollowerCard from "./SuggestedFollowerCard";

const FollowerSuggestion = () => {
  const suggestedUsers = [
    {
      photo: "/social.svg",
      username: "aang",
      fullName: "newAvatar",
    },
    {
      photo: "/social.svg",
      username: "aang",
      fullName: "newAvatar",
    },
    {
      photo: "/social.svg",
      username: "aang",
      fullName: "newAvatar",
    },
  ];

  return (
    <div className=" h-fit px-3 py-3 mx-2 rounded-md bg-[#282C37]">
      <div>
        <span className="text-white">
          People you may know
        </span>
      </div>
      <ul className="mt-2">
        {suggestedUsers.map((user) => (
          <li>
            <SuggestedFollowerCard suggestedUser={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerSuggestion;
