import Image from "next/image";

const Banner = () => {
  return (
    <div>
      <Image
        src="/social.svg"
        alt=""
        width={450}
        height={500}
      />
    </div>
  );
};

export default Banner;
