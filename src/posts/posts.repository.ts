import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from '../minio/minio.service';
import { CreateCommentDto } from './_utils/dtos/requests/create-comment.dto';
import { CreatePostDto } from './_utils/dtos/requests/create-post.dto';
import { GetPostWithCommentsDto } from './_utils/dtos/responses/get-post-with-comments.dto';
import { GetPostDto } from './_utils/dtos/responses/get-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

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
      .then((post) => {
        if (!post) throw new NotFoundException('Post not found');

        return Promise.all([
          post.photo ? this.minioService.getPresignedUrl(post.photo) : null,
          this.minioService.getPresignedUrl(post.user.profilePicture),
          Promise.all(
            post.post_comment.map((comment) =>
              this.minioService.getPresignedUrl(comment.user.profilePicture),
            ),
          ),
        ]).then(
          ([
            postPhotoUrl,
            userProfilePictureUrl,
            commentUserProfilePictureUrls,
          ]) => ({
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,
            photo: postPhotoUrl,
            user: {
              id: post.user.id,
              pseudo: post.user.pseudo,
              profilePicture: userProfilePictureUrl,
              role: post.user.role,
            },
            likes: post._count.post_like,
            comments: post._count.post_comment,
            postComments: post.post_comment.map((comment, index) => ({
              id: comment.id,
              content: comment.content,
              user: {
                id: comment.user.id,
                pseudo: comment.user.pseudo,
                profilePicture: commentUserProfilePictureUrls[index],
                role: comment.user.role,
              },
              createdAt: comment.createdAt,
            })),
            isLiked: post.post_like.some((like) =>
              currentUserId ? like.id_user === currentUserId : false,
            ),
          }),
        );
      })
      .catch((error) => {
        if (error instanceof NotFoundException) throw error;
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
        Promise.all(
          posts.map((post) =>
            Promise.all([
              post.photo ? this.minioService.getPresignedUrl(post.photo) : null,
              this.minioService.getPresignedUrl(post.user.profilePicture),
            ]).then(([photoUrl, profilePictureUrl]) => ({
              id: post.id,
              content: post.content,
              createdAt: post.createdAt,
              photo: photoUrl,
              user: {
                id: post.user.id,
                pseudo: post.user.pseudo,
                profilePicture: profilePictureUrl,
                role: post.user.role,
              },
              likes: post._count.post_like,
              comments: post._count.post_comment,
              isLiked: post.post_like.some((like) =>
                currentUserId ? like.id_user === currentUserId : false,
              ),
            })),
          ),
        ),
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
        Promise.all(
          posts.map((post) =>
            Promise.all([
              post.photo ? this.minioService.getPresignedUrl(post.photo) : null,
              this.minioService.getPresignedUrl(post.user.profilePicture),
            ]).then(([photoUrl, profilePictureUrl]) => ({
              id: post.id,
              content: post.content,
              createdAt: post.createdAt,
              photo: photoUrl,
              user: {
                id: post.user.id,
                pseudo: post.user.pseudo,
                profilePicture: profilePictureUrl,
                role: post.user.role,
              },
              likes: post._count.post_like,
              comments: post._count.post_comment,
              isLiked: post.post_like.some(
                (like) => like.id_user === currentUserId,
              ),
            })),
          ),
        ),
      );

  createPost = (
    postId: string,
    user: user,
    createPostDto: CreatePostDto,
    key?: string,
  ) =>
    this.prismaService.post.create({
      data: {
        id: postId,
        content: createPostDto.content,
        photo: createPostDto.photo && key,
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

  updatePostImage = (id: string, key: string) =>
    this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        photo: key,
      },
    });
}
