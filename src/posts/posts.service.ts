import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateCommentDto } from './_utils/dtos/requests/create-comment.dto';
import { CreatePostDto } from './_utils/dtos/requests/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly notificationsService: NotificationsService,
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async toggleLike(user: user, postId: string) {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundException("Le post n'existe pas");
    }

    await this.postsRepository.toggleLike(user.id, postId);

    if (user.id === post.user.id) return;

    //TODO: rework bdd, add (createdBy: user) to notification

    console.log(user.id, post.user.id);

    if (await this.notificationsService.checkReceiveNotifications(user))
      if (await this.postsRepository.checkLike(user.id, postId))
        this.notificationsRepository.createLikeNotification(user.id, postId);
      else
        await this.notificationsRepository.deleteLikeNotification(
          user.id,
          postId,
        );
  }

  async createPost(user: user, createPostDto: CreatePostDto) {
    const post = await this.postsRepository.createPost(user, createPostDto);
    if (!post) throw new ConflictException("Le post n'a pas pu être créé");

    return post;
  }

  async createComment(
    user: user,
    postId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) throw new NotFoundException("Le post n'existe pas");

    return this.postsRepository.createComment(user, postId, createCommentDto);
  }

  async deletePost(user: user, postId: string) {
    const post = await this.postsRepository.getPostById(postId);
    if (!post || post.user.id != user.id) {
      throw new NotFoundException("Le post n'existe pas");
    }

    await this.postsRepository.deletePost(postId);
    await this.notificationsRepository.deletePostNotifications(postId);
  }

  async deleteComment(user: user, commentId: string) {
    const comment = await this.postsRepository.getCommentById(commentId);
    if (!comment || comment.id_user != user.id)
      throw new NotFoundException("Le commentaire n'existe pas");

    return this.postsRepository.deleteComment(commentId);
  }
}
