import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByName = (settingName: string) =>
    this.prismaService.setting.findFirst({
      where: { name: settingName },
      select: { id: true, name: true },
    });

  findUserSetting = (userId: string, settingId: string) =>
    this.prismaService.user_setting.findUnique({
      where: {
        id_user_id_setting: {
          id_user: userId,
          id_setting: settingId,
        },
      },
    });

  createUserSetting = (userId: string, settingId: string) =>
    this.prismaService.user_setting.create({
      data: {
        id_user: userId,
        id_setting: settingId,
      },
    });

  deleteUserSetting = (userId: string, settingId: string) =>
    this.prismaService.user_setting.deleteMany({
      where: {
        id_user: userId,
        id_setting: settingId,
      },
    });
}
