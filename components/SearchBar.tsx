"use client";
import { useState } from "react";
import SearchList from "./SearchList";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "react-query";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = ({
  initialData,
}: {
  initialData?: "";
}) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const searchInputHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setSearchKey(e.currentTarget.value);
  };

  const { mutate, data: searchedUser } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/search`,
        {
          searchKey,
        }
      );
      return res.data;
    }
  );

  const debounce = useDebouncedCallback((value) => {
    setSearchKey(value);
    mutate();
  }, 500);

  return (
    <div className="relative shadow-sm focus-within:bg-transparent focus-within:border focus-within:border-brand bg-[#282C37] h-10 rounded-md m-2 flex items-center">
      <input
        className="text-white bg-transparent outline-none h-full w-[80%] px-4"
        type="text"
        placeholder="search peoples"
        onChange={(
          e: React.SyntheticEvent<HTMLInputElement>
        ) => debounce(e.currentTarget.value)}
        value={initialData}
      />
      <div className="flex justify-end w-[20%] pr-3">
        <HiOutlineSearch color="white" size={20} />
      </div>

      {searchKey.length > 0 &&
        searchedUser?.data?.searchResult?.length > 0 && (
          <SearchList
            searchResult={searchedUser?.data?.searchResult}
          />
        )}
    </div>
  );
};

export default SearchBar;
