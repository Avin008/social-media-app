import { useAuthStore } from "@/store/useAuthStore";
import CommentBox from "./CommentBox";
import PostEngagementCount from "./PostEngagementCount";
import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useMutation } from "react-query";
import axios from "axios";

const PostActions = ({ post }: { post: Post }) => {
  const { token, _id } = useAuthStore((store) => store);

  const { mutate: likePost } = useMutation(async () => {
    const res = await axios.post(
      "http://localhost:3333/like",
      { token, post }
    );
    return res.data;
  });

  const { mutate: unLikePost } = useMutation(async () => {
    const res = await axios.put(
      "http://localhost:3333/like",
      { token, post }
    );
    return res.data;
  });

  return (
    <div className="flex items-center gap-2">
      <PostEngagementCount
        likesCount={post.likes.length}
        commentCount={post.comments.length}
      />
      <CommentBox post={post} />
      {post.likes.includes(_id) ? (
        <button
          onClick={() => unLikePost()}
          className="h-full w-10 text-2xl"
        >
          <AiFillHeart className="text-brand" size={30} />
        </button>
      ) : (
        <button
          onClick={() => likePost()}
          className="h-full w-10 text-2xl"
        >
          <AiOutlineHeart
            className="text-brand"
            size={30}
          />
        </button>
      )}
    </div>
  );
};

export default PostActions;
