import Image from "next/image";
import SearchedUser from "./SearchedUser";

const SearchList = () => {
  const data = [
    {
      username: "doggybag",
      name: "john wick",
      photo: "/social.svg",
    },
    {
      username: "maggytop",
      name: "goku black",
      photo: "/social.svg",
    },
    {
      username: "aangavatar",
      name: "aang avatar",
      photo: "/social.svg",
    },
  ];
  return (
    <div className="absolute left-0 py-1 right-0 top-12 min-h-20 shadow-sm border rounded-md">
      <ul>
        {data.map((user) => (
          <li className="hover:bg-[#282C37] cursor-pointer">
            <SearchedUser user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
