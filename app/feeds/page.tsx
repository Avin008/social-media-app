import Sidebar from "@/components/Sidebar";

const UserFeedsPage = () => {
  return (
    <main className="bg-background h-screen">
      <div className="grid h-full grid-cols-12">
        <div className="border border-gray-500 col-span-3">
          <Sidebar />
        </div>
        <div className="border border-gray-500 col-span-6"></div>
        <div className="border border-gray-500 col-span-3"></div>
      </div>
    </main>
  );
};

export default UserFeedsPage;
