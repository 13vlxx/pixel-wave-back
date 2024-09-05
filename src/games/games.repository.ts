import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from '../minio/minio.service';
import { GetLiteGameDto } from './_utils/dtos/responses/get-lite-game.dto';

@Injectable()
export class GamesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  findAllLite = (): Promise<GetLiteGameDto[]> =>
    this.prismaService.game
      .findMany({
        select: {
          id: true,
          name: true,
          logo: true,
        },
      })
      .then((games) =>
        Promise.all(
          games.map((game) =>
            this.minioService
              .getPresignedUrl(game.logo)
              .then((presignedUrl) => ({
                id: game.id,
                name: game.name,
                logo: presignedUrl,
              })),
          ),
        ),
      );

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
    this.prismaService.game
      .findUnique({
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
            where: {
              game: {
                name,
              },
            },
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
      })
      .then((game) => {
        if (!game) return null;

        return Promise.all([
          this.minioService.getPresignedUrl(game.logo),
          Promise.all(
            game.media.map((m) => this.minioService.getPresignedUrl(m.path)),
          ),
          Promise.all(
            game.game_advice.map((advice) =>
              Promise.all([
                this.minioService.getPresignedUrl(advice.user.profilePicture),
                this.minioService.getPresignedUrl(advice.game.logo),
              ]),
            ),
          ),
          Promise.all(
            game.news.map((n) => this.minioService.getPresignedUrl(n.logo)),
          ),
        ]).then(([gameLogo, mediaPaths, adviceUrls, newsLogos]) => ({
          ...game,
          logo: gameLogo,
          media: game.media.map((m, index) => ({
            ...m,
            path: mediaPaths[index],
          })),
          game_advice: game.game_advice.map((advice, index) => ({
            ...advice,
            user: {
              ...advice.user,
              profilePicture: adviceUrls[index][0],
            },
            game: {
              ...advice.game,
              logo: adviceUrls[index][1],
            },
          })),
          news: game.news.map((n, index) => ({
            ...n,
            logo: newsLogos[index],
          })),
        }));
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
        Promise.all(
          games.map((fav) =>
            this.minioService
              .getPresignedUrl(fav.game.logo)
              .then((presignedUrl) => ({
                id: fav.game.id,
                name: fav.game.name,
                logo: presignedUrl,
              })),
          ),
        ),
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
