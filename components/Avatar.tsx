import Image from "next/image";

const Avatar = ({ image }: { image: string }) => {
  return (
    <div className="w-10 border h-10 relative rounded-full">
      <Image
        className="rounded-full"
        src={image}
        alt=""
        fill
      />
    </div>
  );
};

export default Avatar;
