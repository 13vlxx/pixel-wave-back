import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UpdateReceiveNotificationsDto } from './_utils/dtos/requests/update-receive-notifications.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Protect()
  @Get()
  @ApiOperation({ summary: 'Get notifications' })
  getNotifications(@ConnectedUser() user: user) {
    return this.notificationsService.getNotifications(user);
  }

  @Protect()
  @Get('/check')
  @ApiOperation({ summary: 'Check receive notifications' })
  checkReceiveNotifications(@ConnectedUser() user: user) {
    return this.notificationsService.checkReceiveNotifications(user);
  }

  @Protect()
  @Patch('/receive-notifications')
  @ApiOperation({ summary: 'Toggle receive notifications' })
  toggleReceiveNotifications(
    @ConnectedUser() user: user,
    @Body() updateReceiveNotificationsDto: UpdateReceiveNotificationsDto,
  ) {
    return this.notificationsService.toggleReceiveNotifications(
      user,
      updateReceiveNotificationsDto,
    );
  }
}
