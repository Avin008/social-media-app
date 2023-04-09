import SearchedUser from "./SearchedUser";

const SearchList = () => {
  const data: [] = [];

  return (
    <div className="absolute left-0 py-1 right-0 top-12 min-h-20 shadow-sm border rounded-md">
      <ul>
        {data?.map((user) => (
          <li
            key={
              Date.now() + Math.floor(Math.random() * 1000)
            }
            className="hover:bg-[#282C37] cursor-pointer"
          >
            <SearchedUser user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
