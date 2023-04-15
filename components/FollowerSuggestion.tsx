"use client";
import { useAuthStore } from "@/store/useAuthStore";
import SuggestedFollowerCard from "./SuggestedFollowerCard";
import { useQuery } from "react-query";
import axios from "axios";

const FollowerSuggestion = () => {
  const token = useAuthStore((store) => store.token);

  const { data, isLoading } = useQuery(
    ["users"],
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/suggestions`,
        { token }
      );
      return res.data;
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
        {data?.data.suggestedUsers?.map((x: any) => (
          <SuggestedFollowerCard
            key={x._id}
            suggestedUser={x}
          />
        ))}
      </ul>
    </div>
  );
};

export default FollowerSuggestion;
