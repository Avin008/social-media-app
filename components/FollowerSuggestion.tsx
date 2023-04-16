"use client";
import { useAuthStore } from "@/store/useAuthStore";
import SuggestedFollowerCard from "./SuggestedFollowerCard";
import { useQuery } from "react-query";
import axios from "axios";

const FollowerSuggestion = () => {
  const token = useAuthStore((store) => store.token);

  const { data: suggestedUsers, isLoading } = useQuery(
    ["users"],
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/suggestions`,
        { token }
      );
      return res.data.data.suggestedUsers as UserType[];
    }
  );

  return (
    <div className=" h-fit px-3 py-3 mx-2 rounded-md bg-[#282C37]">
      <div>
        <span className="text-white">
          People you may know
        </span>
      </div>
      <ul className="mt-2">
        {suggestedUsers?.map((user: UserType) => (
          <SuggestedFollowerCard
            key={user?._id}
            suggestedUser={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default FollowerSuggestion;
