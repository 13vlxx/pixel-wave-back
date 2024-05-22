export interface PostDto {
  user: {
    id: string;
    pseudo: string;
    profilePicture: string;
  };
  id: string;
  createdAt: Date;
  _count: {
    post_like: number;
  };
  content: string;
  photo: string;
  likedByCurrentUser: boolean;
}
