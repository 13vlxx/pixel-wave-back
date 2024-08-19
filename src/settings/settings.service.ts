import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import { SettingsName } from './_utils/settings.enum';
import { SettingsRepository } from './settings.repository';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async checkReceiveEmails(user: user) {
    const setting = await this.settingsRepository.findByName(
      SettingsName.RECEIVE_EMAILS,
    );

    if (!setting) throw new NotFoundException('Setting not found');

    const userSetting = await this.settingsRepository.findUserSetting(
      user.id,
      setting.id,
    );

    return userSetting ? true : false;
  }

  async toggleReceiveEmails(user: user, receive: boolean) {
    const setting = await this.settingsRepository.findByName(
      SettingsName.RECEIVE_EMAILS,
    );

    if (!setting) throw new NotFoundException('Setting not found');

    const userSetting = await this.settingsRepository.findUserSetting(
      user.id,
      setting.id,
    );

    if (receive && !userSetting)
      await this.settingsRepository.createUserSetting(user.id, setting.id);
    else if (!receive && userSetting)
      await this.settingsRepository.deleteUserSetting(user.id, setting.id);
    return;
  }
}
