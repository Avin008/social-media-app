import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "./Avatar";
import CommentBox from "./CommentBox";
import PostEngagementCount from "./PostEngagementCount";
import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useMutation } from "react-query";

const PostActions = ({ post }: { post: Post }) => {
  const { token, userId } = useAuthStore((store) => store);

  const { mutate: likePost } = useMutation(async () => {
    return fetch(
      `${process.env.NEXT_PUBLIC_URL}/post/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          postId: post.post_id,
        }),
      }
    ).then((res) => res.json());
  });

  const { mutate: unLikePost } = useMutation(async () => {
    return fetch(
      `${process.env.NEXT_PUBLIC_URL}/post/unlike`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          postId: post.post_id,
        }),
      }
    ).then((res) => res.json());
  });

  return (
    <div className="flex items-center gap-2">
      <PostEngagementCount
        likesCount={post.likes.length}
        commentCount={post.comments.length}
      />
      <CommentBox post={post} />
      {post.likes.includes(userId) ? (
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
