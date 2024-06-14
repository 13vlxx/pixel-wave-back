import { Body, Controller, Get, HttpCode, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UpdateSettingsDto } from './_utils/dtos/requests/update-settings.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('/me')
  me(@ConnectedUser() user: user) {
    return this.usersService.getMe(user);
  }

  @Protect()
  @HttpCode(204)
  @ApiOperation({ summary: 'Update user settings' })
  @Patch('/settings')
  updateUserSettings(
    @ConnectedUser() user: user,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.usersService.updateSettings(user, updateSettingsDto);
  }
}
