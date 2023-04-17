import Image from "next/image";

const Avatar = ({
  image,
  height,
  width,
}: {
  image: string | undefined;
  height?: string;
  width?: string;
}) => {
  return (
    <div
      style={{
        width: width ? width : "40px",
        height: height ? height : "40px",
      }}
      className={`relative rounded-full border ${
        !image && "bg-gray-400"
      }`}
    >
      <Image
        className="rounded-full"
        src={!image ? "" : image}
        alt=""
        fill
      />
    </div>
  );
};

export default Avatar;
