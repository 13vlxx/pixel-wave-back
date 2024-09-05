import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from '../minio/minio.service';
import { CreateAdviceDto } from './_utils/dtos/requests/create-advice.dto';

@Injectable()
export class AdvicesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  findAll = () =>
    this.prismaService.game_advice
      .findMany({
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
        take: 10,
      })
      .then((advices) =>
        Promise.all(
          advices.map((advice) =>
            Promise.all([
              this.minioService.getPresignedUrl(advice.user.profilePicture),
              this.minioService.getPresignedUrl(advice.game.logo),
            ]).then(([userProfileUrl, gameLogoUrl]) => ({
              user: {
                ...advice.user,
                profilePicture: userProfileUrl,
              },
              game: {
                ...advice.game,
                logo: gameLogoUrl,
              },
              advice: advice.advice,
              note: advice.note,
            })),
          ),
        ),
      );

  checkIfUserAlreadyPostedAdvice = (userId: string, gameId: string) =>
    this.prismaService.game_advice.findFirst({
      where: {
        id_user: userId,
        id_game: gameId,
      },
      include: {
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
      },
    });

  createAdvice = (
    userId: string,
    gameId: string,
    createAdviceDto: CreateAdviceDto,
  ) =>
    this.prismaService.game_advice.create({
      data: {
        id_user: userId,
        id_game: gameId,
        advice: createAdviceDto.advice,
        note: createAdviceDto.note,
      },
    });

  updateAdvice = (
    userId: string,
    gameId: string,
    updateAdviceDto: CreateAdviceDto,
  ) =>
    this.prismaService.game_advice.update({
      where: {
        id_game_id_user: {
          id_game: gameId,
          id_user: userId,
        },
      },
      data: {
        advice: updateAdviceDto.advice,
        note: updateAdviceDto.note,
      },
    });
}
