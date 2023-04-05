const SearchBar = () => {
  return (
    <div className="relative shadow-sm focus-within:bg-transparent focus-within:border focus-within:border-brand bg-[#282C37] h-10 rounded-md m-2 flex items-center">
      <input
        className="text-white bg-transparent outline-none h-full w-[90%] px-4"
        type="text"
        placeholder="search peoples"
      />
      <div className="flex justify-end w-[10%] px-2">
        <span>🔍</span>
      </div>
    </div>
  );
};

export default SearchBar;
