import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 flex h-20 items-center justify-between px-10">
      <div className="flex items-center gap-2">
        <Image
          src="/brand.png"
          width={30}
          height={30}
          alt=""
        />
        <span className="text-xl font-semibold text-white">
          Picco
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
