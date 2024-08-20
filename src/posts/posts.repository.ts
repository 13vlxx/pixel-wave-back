import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getPostById = (postId: string, currentUserId?: string) =>
    this.prismaService.post
      .findUnique({
        where: {
          id: postId,
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
              post_comment: true,
            },
          },
          post_like: {
            select: {
              id_user: true,
            },
          },
        },
      })
      .then((post) => ({
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
        comments: post._count.post_comment,
        isLiked: post.post_like.some((like) =>
          currentUserId ? like.id_user === currentUserId : false,
        ),
      }));

  getPostsFeed = async (currentUserId?: string) =>
    this.prismaService.post
      .findMany({
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
              post_comment: true,
            },
          },
          post_like: {
            select: {
              id_user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
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
          comments: post._count.post_comment,
          isLiked: post.post_like.some((like) =>
            currentUserId ? like.id_user === currentUserId : false,
          ),
        })),
      );

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
              post_comment: true,
            },
          },
          post_like: {
            select: {
              id_user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
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
          comments: post._count.post_comment,
          isLiked: post.post_like.some(
            (like) => like.id_user === currentUserId,
          ),
        })),
      );

  toggleLike = (userId: string, postId: string) =>
    this.prismaService.post_like
      .findFirst({
        where: {
          id_user: userId,
          id_post: postId,
        },
      })
      .then((like) => {
        if (like) {
          return this.prismaService.post_like.delete({
            where: {
              id_post_id_user: {
                id_user: userId,
                id_post: postId,
              },
            },
          });
        } else {
          return this.prismaService.post_like.create({
            data: {
              id_user: userId,
              id_post: postId,
            },
          });
        }
      });
}
