import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import { SettingsName } from './_utils/settings.enum';
import { SettingsRepository } from './settings.repository';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async checkRecieveEmails(user: user) {
    const setting = await this.settingsRepository.findByName(
      SettingsName.RECIEVE_EMAILS,
    );

    if (!setting) throw new NotFoundException('Setting not found');

    const userSetting = await this.settingsRepository.findUserSetting(
      user.id,
      setting.id,
    );

    return userSetting ? true : false;
  }

  async toggleRecieveEmails(user: user, recieveEmails: boolean) {
    const setting = await this.settingsRepository.findByName(
      SettingsName.RECIEVE_EMAILS,
    );

    if (!setting) throw new NotFoundException('Setting not found');

    const userSetting = await this.settingsRepository.findUserSetting(
      user.id,
      setting.id,
    );

    if (recieveEmails && !userSetting)
      await this.settingsRepository.createUserSetting(user.id, setting.id);
    else if (!recieveEmails && userSetting)
      await this.settingsRepository.deleteUserSetting(user.id, setting.id);
    return;
  }
}
