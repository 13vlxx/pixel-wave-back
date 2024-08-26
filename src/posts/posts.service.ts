import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly notificationsService: NotificationsService,
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async toggleLike(user: user, postId: string) {
    if (!(await this.postsRepository.getPostById(postId))) {
      throw new NotFoundException("Le post n'existe pas");
    }

    await this.postsRepository.toggleLike(user.id, postId);

    if (await this.notificationsService.checkReceiveNotifications(user))
      if (await this.postsRepository.checkLike(user.id, postId))
        this.notificationsRepository.createLikeNotification(user.id, postId);
      else
        await this.notificationsRepository.deleteLikeNotification(
          user.id,
          postId,
        );
  }

  async deletePost(user: user, postId: string) {
    const post = await this.postsRepository.getPostById(postId);
    if (!post || post.user.id != user.id) {
      throw new NotFoundException("Le post n'existe pas");
    }

    await this.postsRepository.deletePost(postId);
    await this.notificationsRepository.deletePostNotifications(postId);
  }
}
