import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Protect } from '../auth/_utils/decorators/protect.decorator';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Protect(RoleEnum.ADMIN, RoleEnum.MODERATOR)
  @Get()
  getDashboardData() {
    return this.adminService.getDashboardData();
  }
}
