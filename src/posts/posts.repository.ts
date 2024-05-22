import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllUserPosts = async (userId: string, currentUserId: string) =>
    this.prismaService.post
      .findMany({
        where: {
          id_user: userId,
        },
        select: {
          id: true,
          content: true,
          photo: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              pseudo: true,
              profilePicture: true,
            },
          },
          _count: {
            select: {
              post_like: true,
            },
          },
          post_like: {
            select: {
              id_user: true,
            },
          },
        },
      })
      .then((posts) =>
        posts.map((post) => ({
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
          isLiked: post.post_like.some(
            (like) => like.id_user === currentUserId,
          ),
        })),
      );
}
