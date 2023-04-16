import Image from "next/image";

const PostImage = ({ postImg }: { postImg: string }) => {
  return (
    <div className="relative h-80 rounded-md border border-gray-800 w-full">
      <Image
        className="rounded-md"
        src={postImg}
        alt=""
        fill
      />
    </div>
  );
};

export default PostImage;
