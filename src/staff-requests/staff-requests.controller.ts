import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum, user } from '@prisma/client';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { CreateStaffRequestDto } from './_utils/dtos/requests/create-staff-request.dto';
import { StaffRequestsService } from './staff-requests.service';

@ApiTags('Staff Requests')
@Controller('staff-requests')
export class StaffRequestsController {
  constructor(private readonly staffRequestsService: StaffRequestsService) {}

  @Protect()
  @Get('last')
  getLastRequestForUser(@ConnectedUser() user: user) {
    return this.staffRequestsService.getLastRequestForUser(user);
  }

  @Protect(RoleEnum.USER, RoleEnum.CERTIFIED)
  @Post()
  createRequest(
    @ConnectedUser() user: user,
    @Body() createStaffRequestDto: CreateStaffRequestDto,
  ) {
    return this.staffRequestsService.createRequest(user, createStaffRequestDto);
  }
}
