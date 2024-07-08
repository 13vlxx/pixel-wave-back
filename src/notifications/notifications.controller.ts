import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UpdateReceiveNotificationsDto } from './_utils/dtos/requests/update-receive-notifications.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

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

  @Protect()
  @Get()
  @ApiOperation({ summary: 'Get notifications' })
  getNotifications(@ConnectedUser() user: user) {
    return this.notificationsService.getNotifications(user);
  }
}
