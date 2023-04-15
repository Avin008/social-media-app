import SearchedUser from "./SearchedUser";
import { useRouter } from "next/navigation";

const SearchList = ({
  searchResult,
}: {
  searchResult: User[];
}) => {
  const router = useRouter();

  return (
    <div className="absolute bg-gray-800 z-10 left-0 py-1 right-0 top-12 min-h-20 shadow-sm border rounded-md">
      <ul>
        {searchResult?.map((user) => (
          <li
            key={user._id}
            className="hover:bg-[#282C37] cursor-pointer"
            onClick={() =>
              router.push(`/feeds/profile/${user._id}`)
            }
          >
            <SearchedUser user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
