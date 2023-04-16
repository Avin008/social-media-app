"use client";
import { useState } from "react";
import SearchList from "./SearchList";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "react-query";
import axios from "axios";

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
        "http://localhost:3333/user/search",
        {
          searchKey,
        }
      );
      return res.data;
    },
    {
      onSuccess: (value) => {
        console.log(value);
      },
    }
  );

  const debounce = useDebouncedCallback((value) => {
    setSearchKey(value);
    mutate();
  }, 500);

  return (
    <div className="relative shadow-sm focus-within:bg-transparent focus-within:border focus-within:border-brand bg-[#282C37] h-10 rounded-md m-2 flex items-center">
      <input
        className="text-white bg-transparent outline-none h-full w-[90%] px-4"
        type="text"
        placeholder="search peoples"
        onChange={(
          e: React.SyntheticEvent<HTMLInputElement>
        ) => debounce(e.currentTarget.value)}
        value={initialData}
      />
      <div className="flex justify-end w-[10%] px-2">
        <span>🔍</span>
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
