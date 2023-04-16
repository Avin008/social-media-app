import { useAuthStore } from "@/store/useAuthStore";
import CommentBox from "./CommentBox";
import PostEngagementCount from "./PostEngagementCount";
import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const PostActions = ({
  post,
  comment,
}: {
  post: Post;
  comment: any;
}) => {
  const { token, _id } = useAuthStore((store) => store);

  const queryClient = useQueryClient();

  const { mutate: likePost } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/like`,
        { token, post }
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: () => {
        toast.error("something went wrong");
      },
    }
  );

  const { mutate: unLikePost } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/post/unlike`,
        { token, post }
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: () => {
        toast.error("something went wrong");
      },
    }
  );

  return (
    <div className="flex items-center gap-2">
      <PostEngagementCount
        likesCount={post.likes?.length}
        commentCount={
          comment?.filter(
            (x: any) => x.post_id === post._id
          )?.length
        }
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
