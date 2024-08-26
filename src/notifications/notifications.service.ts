import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import { SettingsName } from 'src/settings/_utils/settings.enum';
import { SettingsRepository } from 'src/settings/settings.repository';
import { UpdateReceiveNotificationsDto } from './_utils/dtos/requests/update-receive-notifications.dto';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly settingsRepository: SettingsRepository,
  ) {}

  async toggleReceiveNotifications(
    user: user,
    updateReceiveNotificationsDto: UpdateReceiveNotificationsDto,
  ) {
    const setting = await this.settingsRepository.findByName(
      SettingsName.RECEIVE_NOTIFICATIONS,
    );

    if (!setting) throw new NotFoundException('Setting not found');

    const userSetting = await this.settingsRepository.findUserSetting(
      user.id,
      setting.id,
    );

    if (updateReceiveNotificationsDto.receiveNotifications && !userSetting)
      await this.settingsRepository.createUserSetting(user.id, setting.id);
    else if (!updateReceiveNotificationsDto.receiveNotifications && userSetting)
      await this.settingsRepository.deleteUserSetting(user.id, setting.id);

    return updateReceiveNotificationsDto.receiveNotifications;
  }

  async checkReceiveNotifications(user: user) {
    const setting = await this.settingsRepository.findByName(
      SettingsName.RECEIVE_NOTIFICATIONS,
    );

    if (!setting) throw new NotFoundException('Setting not found');

    const userSetting = await this.settingsRepository.findUserSetting(
      user.id,
      setting.id,
    );

    return userSetting ? true : false;
  }

  getNotifications(user: user) {
    return this.notificationsRepository.getUserNotifications(user.id);
  }
}
