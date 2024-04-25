import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlatformsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll = () => this.prismaService.platform.findMany();
}
