import { Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import { MinioMapper } from './minio.mapper';
import { MinioService } from './minio.service';

@Module({
  imports: [],
  controllers: [MinioController],
  providers: [MinioService, MinioMapper],
  exports: [MinioService, MinioMapper],
})
export class MinioModule {}
