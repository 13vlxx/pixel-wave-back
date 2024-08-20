import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async toggleLike(user: user, postId: string) {
    if (!(await this.postsRepository.getPostById(postId))) {
      throw new NotFoundException("Le post n'existe pas");
    }

    const like = await this.postsRepository.toggleLike(user.id, postId);

    return like;
  }
}
