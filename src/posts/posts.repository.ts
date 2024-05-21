import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllUserPosts = (id: string) =>
    this.prismaService.post.findMany({
      where: {
        id_user: id,
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
      },
    });
}
