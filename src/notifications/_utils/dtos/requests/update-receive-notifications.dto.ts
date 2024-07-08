import { IsBoolean } from 'class-validator';

export class UpdateReceiveNotificationsDto {
  @IsBoolean()
  receiveNotifications: boolean;
}
