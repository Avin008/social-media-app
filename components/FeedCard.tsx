import Avatar from "./Avatar";
import UserInfo from "./userInfo";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import UserComment from "./UserComment";
import { useMutation } from "react-query";
import { useAuthStore } from "@/store/useAuthStore";

const FeedCard = ({ post }: { post: Post }) => {
  const token = useAuthStore((store) => store.token);

  const { data, isLoading, isError, mutate } = useMutation(
    async () => {
      return fetch("http://localhost:3080/post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          postId: post.post_id,
        }),
      }).then((res) => res.json());
    }
  );

  const { mutate: likePost } = useMutation(async () => {
    return fetch("http://localhost:3080/post/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        postId: post.post_id,
      }),
    }).then((res) => res.json());
  });

  const { mutate: unLikePost } = useMutation(async () => {
    return fetch("http://localhost:3080/post/unlike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        postId: post.post_id,
      }),
    }).then((res) => res.json());
  });

  return (
    <div className="border p-4 border-gray-600 h-fit relative rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Avatar image={post.userPhoto} />
          <UserInfo
            username={post.username}
            fullName={post.fullname}
          />
        </div>
        <div>
          <ul className="text-xs flex gap-2 bg-[#282C37] px-2 py-1 rounded-full">
            <li>
              {post.likes.includes(
                "cyTL0avVUadXygdiUtceG"
              ) && (
                <button
                  className="px-2"
                  onClick={() => unLikePost()}
                >
                  unlike post
                </button>
              )}
              {!post.likes.includes(
                "cyTL0avVUadXygdiUtceG"
              ) && (
                <button
                  className="px-2"
                  onClick={() => likePost()}
                >
                  like post
                </button>
              )}
            </li>
            <li>
              <button
                className="px-2"
                onClick={() => mutate()}
              >
                remove post
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="">{post.post_text}</div>
      {post.postImg && <PostImage postImg={post.postImg} />}
      <PostActions likesCount={post.likes.length} />
      {/* <UserComment
        comment={{
          comment: "this is just a comment",
          username: "gohan",
        }}
      /> */}
    </div>
  );
};

export default FeedCard;
