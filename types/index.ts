type Post = {
  userPhoto: string;
  user_id: string;
  username: string;
  fullname: string;
  post_id: string;
  post_text: string;
  postImg?: string;
  likes: string[];
  comments: {
    user_id: string;
    username: string;
    fullname: string;
    comment: string;
  }[];
};
