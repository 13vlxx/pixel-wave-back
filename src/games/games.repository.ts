import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GamesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllLite = () =>
    this.prismaService.game.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
      },
    });

  findAll = () =>
    this.prismaService.game.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
        description: true,
        releaseDate: true,
        game_category: {
          select: {
            category: true,
          },
        },
        game_platform: {
          select: {
            platform: true,
          },
        },
      },
    });

  findGameByName = (name: string) =>
    this.prismaService.game.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        logo: true,
        description: true,
        releaseDate: true,
        media: {
          select: {
            id: true,
            type: true,
            path: true,
          },
        },
        game_platform: {
          select: {
            platform: {
              select: {
                name: true,
              },
            },
          },
        },
        game_advice: {
          select: {
            user: {
              select: {
                id: true,
                pseudo: true,
                profilePicture: true,
              },
            },
            game: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
            advice: true,
            note: true,
          },
        },
      },
    });
}
