import Image from "next/image";

const Brand = () => {
  return (
    <div className="m-5">
      <div className="flex items-center gap-2">
        <Image
          src="/brand.png"
          width={25}
          height={25}
          alt=""
        />
        <span className="text-xl font-semibold text-white">
          Picco
        </span>
      </div>
    </div>
  );
};

export default Brand;
