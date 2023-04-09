"use client";
import { useAuthStore } from "@/store/useAuthStore";
import SuggestedFollowerCard from "./SuggestedFollowerCard";
import { useQuery } from "react-query";

const FollowerSuggestion = () => {
  const token = useAuthStore((store) => store.token);

  const { data } = useQuery(["users"], async () => {
    return fetch("http://localhost:3080/user/followers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    }).then((res) => res.json());
  });

  return (
    <div className=" h-fit px-3 py-3 mx-2 rounded-md bg-[#282C37]">
      <div>
        <span className="text-white">
          People you may know
        </span>
      </div>
      <ul className="mt-2">
        {data?.data?.map((x: any) => (
          <SuggestedFollowerCard suggestedUser={x} />
        ))}
      </ul>
    </div>
  );
};

export default FollowerSuggestion;
