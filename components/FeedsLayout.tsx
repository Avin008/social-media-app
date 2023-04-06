import FollowerSuggestion from "./FollowerSuggestion";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

const FeedsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="bg-[#1E1F23] h-screen">
      <div className="h-full w-[80%] bg-[#1E1F23] mx-auto grid grid-cols-12">
        <div className="col-span-2 space-y-5">
          <div className="m-5">
            <span className="text-4xl text-brand font-extrabold">
              Picco
            </span>
          </div>
          <Sidebar />
        </div>
        <div className="col-span-6 border border-gray-600">
          {children}
        </div>
        <div className="border border-gray-600 col-span-4 flex flex-col gap-2">
          <SearchBar />
          <FollowerSuggestion />
        </div>
      </div>
    </main>
  );
};

export default FeedsLayout;
