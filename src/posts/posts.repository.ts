import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './_utils/dtos/requests/create-comment.dto';
import { CreatePostDto } from './_utils/dtos/requests/create-post.dto';
import { GetPostWithCommentsDto } from './_utils/dtos/responses/get-post-with-comments.dto';
import { GetPostDto } from './_utils/dtos/responses/get-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getPostById = (
    postId: string,
    currentUserId?: string,
  ): Promise<GetPostWithCommentsDto> =>
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
              role: true,
            },
          },
          _count: {
            select: {
              post_like: true,
              post_comment: true,
            },
          },
          post_comment: {
            select: {
              id: true,
              content: true,
              user: {
                select: {
                  id: true,
                  pseudo: true,
                  profilePicture: true,
                  role: true,
                },
              },
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
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
          role: post.user.role,
        },
        likes: post._count.post_like,
        comments: post._count.post_comment,
        postComments: post.post_comment.map((comment) => ({
          id: comment.id,
          content: comment.content,
          user: {
            id: comment.user.id,
            pseudo: comment.user.pseudo,
            profilePicture: comment.user.profilePicture,
            role: comment.user.role,
          },
          createdAt: comment.createdAt,
        })),
        isLiked: post.post_like.some((like) =>
          currentUserId ? like.id_user === currentUserId : false,
        ),
      }))
      .catch(() => {
        throw new NotFoundException('Post not found');
      });

  getCommentById = (commentId: string) =>
    this.prismaService.post_comment
      .findUnique({
        where: {
          id: commentId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Comment not found');
      });

  getPostsFeed = (currentUserId?: string): Promise<GetPostDto[]> =>
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
              role: true,
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
            role: post.user.role,
          },
          likes: post._count.post_like,
          comments: post._count.post_comment,
          isLiked: post.post_like.some((like) =>
            currentUserId ? like.id_user === currentUserId : false,
          ),
        })),
      );

  findAllUserPosts = async (
    userId: string,
    currentUserId: string,
  ): Promise<GetPostDto[]> =>
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
              role: true,
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
            role: post.user.role,
          },
          likes: post._count.post_like,
          comments: post._count.post_comment,
          isLiked: post.post_like.some(
            (like) => like.id_user === currentUserId,
          ),
        })),
      );

  createPost = (user: user, createPostDto: CreatePostDto) =>
    this.prismaService.post.create({
      data: {
        content: createPostDto.content,
        // TODO: upload photo
        photo: 'createPostDto.photo',
        id_user: user.id,
      },
    });

  createComment = (
    user: user,
    postId: string,
    createCommentDto: CreateCommentDto,
  ) =>
    this.prismaService.post_comment.create({
      data: {
        content: createCommentDto.content,
        id_post: postId,
        id_user: user.id,
      },
    });

  toggleLike = async (userId: string, postId: string) =>
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

  checkLike = async (userId: string, postId: string) =>
    this.prismaService.post_like.findFirst({
      where: {
        id_user: userId,
        id_post: postId,
      },
    });

  deletePost = (postId: string) =>
    this.prismaService.post
      .delete({
        where: {
          id: postId,
        },
      })
      .catch(() => {
        throw new ConflictException('Post not found');
      });

  deleteComment = (commentId: string) =>
    this.prismaService.post_comment
      .delete({
        where: {
          id: commentId,
        },
      })
      .catch(() => {
        throw new ConflictException('Comment not found');
      });
}
