import FeedCard from "@/components/FeedCard";

const data = [
  {
    userPhoto: "/social.svg",
    username: "aangAvatar",
    fullName: "Avatar Aang",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, delectus!",
  },
  {
    userPhoto: "/social.svg",
    username: "aangAvatar",
    fullName: "Avatar Aang",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, delectus!",
    postImg: "./social.svg",
  },
  {
    userPhoto: "/social.svg",
    username: "aangAvatar",
    fullName: "Avatar Aang",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, delectus!",
    postImg: "./social.svg",
  },
];

const UserFeedsPage = () => {
  return (
    <div>
      <h1 className="text-white m-2 flex flex-col gap-2">
        {data.map((x) => (
          <FeedCard feedData={x} />
        ))}
      </h1>
    </div>
  );
};

export default UserFeedsPage;
