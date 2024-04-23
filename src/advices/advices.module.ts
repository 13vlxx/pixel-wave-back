import { Module } from '@nestjs/common';
import { AdvicesController } from './advices.controller';
import { AdvicesRepository } from './advices.repository';
import { AdvicesService } from './advices.service';

@Module({
  controllers: [AdvicesController],
  providers: [AdvicesService, AdvicesRepository],
  exports: [AdvicesService, AdvicesRepository],
})
export class AdvicesModule {}
