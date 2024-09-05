import { Module } from '@nestjs/common';
import { MinioModule } from '../minio/minio.module';
import { PlatformsController } from './platforms.controller';
import { PlatformsRepository } from './platforms.repository';
import { PlatformsService } from './platforms.service';

@Module({
  imports: [MinioModule],
  controllers: [PlatformsController],
  providers: [PlatformsService, PlatformsRepository],
  exports: [PlatformsService, PlatformsRepository],
})
export class PlatformsModule {}
