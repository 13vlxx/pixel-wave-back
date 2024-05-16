import { Injectable } from '@nestjs/common';
import { CreateAdviceDto } from 'src/games/_utils/dtos/requests/create-advice.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdvicesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll = () =>
    this.prismaService.game_advice.findMany({
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
      take: 10,
    });

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
}
