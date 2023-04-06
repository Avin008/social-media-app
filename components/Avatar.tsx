import Image from "next/image";

const Avatar = ({
  image,
  height,
  width,
}: {
  image: string;
  height?: string;
  width?: string;
}) => {
  return (
    <div
      style={{
        width: width ? width : "40px",
        height: height ? height : "40px",
      }}
      className="border relative rounded-full"
    >
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
