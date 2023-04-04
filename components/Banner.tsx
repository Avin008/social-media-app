import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative">
      <Image src="/social.svg" alt="" fill />
    </div>
  );
};

export default Banner;
