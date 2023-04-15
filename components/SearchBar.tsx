"use client";
import { useState } from "react";
import SearchList from "./SearchList";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState<string>("");

  const searchInputHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setSearchKey(e.currentTarget.value);
  };

  return (
    <div className="relative shadow-sm focus-within:bg-transparent focus-within:border focus-within:border-brand bg-[#282C37] h-10 rounded-md m-2 flex items-center">
      <input
        className="text-white bg-transparent outline-none h-full w-[90%] px-4"
        type="text"
        placeholder="search peoples"
        onChange={searchInputHandler}
        value={searchKey}
      />
      <div className="flex justify-end w-[10%] px-2">
        <span>🔍</span>
      </div>
      {false && <SearchList />}
    </div>
  );
};

export default SearchBar;
