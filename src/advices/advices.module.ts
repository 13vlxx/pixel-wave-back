import { Module } from '@nestjs/common';
import { MinioModule } from '../minio/minio.module';
import { AdvicesController } from './advices.controller';
import { AdvicesRepository } from './advices.repository';
import { AdvicesService } from './advices.service';

@Module({
  imports: [MinioModule],
  controllers: [AdvicesController],
  providers: [AdvicesService, AdvicesRepository],
  exports: [AdvicesService, AdvicesRepository],
})
export class AdvicesModule {}
