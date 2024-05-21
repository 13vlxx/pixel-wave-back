import { Injectable } from '@nestjs/common';
import { PostDto } from './_utils/dtos/responses/post.dto';

@Injectable()
export class PostsMapper {
  constructor() {}

  toPostWithLikesDto = (post: PostDto) => ({
    id: post.id,
    content: post.content,
    createdAt: post.createdAt,
    photo: post.photo,
    user: {
      id: post.user.id,
      pseudo: post.user.pseudo,
      profilePicture: post.user.profilePicture,
    },
    likes: post._count.post_like,
  });
}
