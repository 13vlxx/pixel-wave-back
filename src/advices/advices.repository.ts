import { Injectable } from '@nestjs/common';
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
}
