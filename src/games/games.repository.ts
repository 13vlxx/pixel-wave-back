import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetLiteGameDto } from './_utils/dtos/responses/get-lite-game.dto';

@Injectable()
export class GamesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllLite = (): Promise<GetLiteGameDto[]> =>
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
        game_advice: {
          select: {
            user: {
              select: {
                id: true,
                pseudo: true,
                profilePicture: true,
                role: true,
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
        news: {
          select: {
            id: true,
            title: true,
            logo: true,
            createdAt: true,
          },
          take: 3,
        },
      },
    });

  findUserFavoriteGames = (id: string) =>
    this.prismaService.favorite_game
      .findMany({
        where: {
          id_user: id,
        },
        select: {
          game: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      })
      .then((games) =>
        games.map((fav) => ({
          id: fav.game.id,
          name: fav.game.name,
          logo: fav.game.logo,
        })),
      );

  checkIfFavorite = (id: string, gameId: string) =>
    this.prismaService.favorite_game.findFirst({
      where: {
        id_user: id,
        id_game: gameId,
      },
    });

  addFavorite = (id: string, gameId: string) =>
    this.prismaService.favorite_game
      .create({
        data: {
          id_user: id,
          id_game: gameId,
        },
      })
      .catch(() => new ConflictException('Already in favorites'));

  removeFavorite = (id: string, gameId: string) =>
    this.prismaService.favorite_game
      .delete({
        where: {
          id_game_id_user: {
            id_user: id,
            id_game: gameId,
          },
        },
      })
      .catch(() => new ConflictException('Not in favorites'));
}
