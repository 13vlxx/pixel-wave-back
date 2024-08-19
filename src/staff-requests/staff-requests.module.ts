import { Module } from '@nestjs/common';
import { StaffRequestsController } from './staff-requests.controller';
import { StaffRequestsRepository } from './staff-requests.repository';
import { StaffRequestsService } from './staff-requests.service';

@Module({
  controllers: [StaffRequestsController],
  providers: [StaffRequestsService, StaffRequestsRepository],
})
export class StaffRequestsModule {}
