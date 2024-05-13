import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllLite = () =>
    this.prismaService.news.findMany({
      select: {
        id: true,
        title: true,
        logo: true,
        createdAt: true,
      },
      take: 3,
    });

  findAll = () =>
    this.prismaService.news.findMany({
      select: {
        id: true,
        game: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        title: true,
        logo: true,
        content: true,
        createdAt: true,
      },
    });
}
