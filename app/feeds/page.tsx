import FeedCard from "@/components/FeedCard";

const UserFeedsPage = () => {
  return (
    <div>
      <h1 className="text-white m-2">
        {[1, 2, 3, 4, 5, 6].map((x) => (
          <FeedCard />
        ))}
      </h1>
    </div>
  );
};

export default UserFeedsPage;
