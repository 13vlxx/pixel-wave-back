import { Module } from '@nestjs/common';
import { PlatformsController } from './platforms.controller';
import { PlatformsRepository } from './platforms.repository';
import { PlatformsService } from './platforms.service';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsService, PlatformsRepository],
  exports: [PlatformsService, PlatformsRepository],
})
export class PlatformsModule {}
