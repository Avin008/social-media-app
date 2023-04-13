type User = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  followers: string[];
  following: string[];
};

type Comments = {
  _id: string;
  author: User;
  comment: string;
  createdAt: Date;
};

type Post = {
  _id: string;
  img: string;
  author: User;
  text: string;
  likes: string[];
  comments: Comments[];
  createdAt: Date;
  updatedAt: Date;
};
