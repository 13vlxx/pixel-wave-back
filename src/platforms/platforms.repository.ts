import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class PlatformsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  findAll = () =>
    this.prismaService.platform.findMany().then((platforms) =>
      Promise.all(
        platforms.map(async (platform) => ({
          ...platform,
          image: await this.minioService.getPresignedUrl(platform.image),
        })),
      ),
    );
}
