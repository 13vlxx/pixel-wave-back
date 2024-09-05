import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class CategoriesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  findAll = () =>
    this.prismaService.category.findMany().then((categories) =>
      Promise.all(
        categories.map(async (category) => ({
          ...category,
          image: await this.minioService.getPresignedUrl(category.image),
        })),
      ),
    );
}
