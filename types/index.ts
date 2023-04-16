type FollowersType = string;
type FollowingType = string;

type UserType =
  | {
      _id: string;
      profilePic: string;
      fullname: string;
      username: string;
      email: string;
      followers: FollowersType[];
      following: FollowingType[];
    }
  | undefined;

type PostType =
  | {
      likes: string[];
      _id: string;
      author: UserType;
      text: string;
      img: string;
      createdAt: number;
      updatedAt: number;
    }
  | undefined;

type CommentType =
  | {
      _id: string;
      post_id: string;
      author: UserType;
      comment: string;
    }
  | undefined;
