import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MinioController } from './minio.controller';
import { MinioMapper } from './minio.mapper';
import { MinioService } from './minio.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [MinioController],
  providers: [MinioService, MinioMapper],
  exports: [MinioService, MinioMapper],
})
export class MinioModule {}
