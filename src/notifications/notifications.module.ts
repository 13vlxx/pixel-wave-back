import { Module } from '@nestjs/common';
import { SettingsModule } from 'src/settings/settings.module';
import { MinioModule } from '../minio/minio.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [SettingsModule, MinioModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository],
  exports: [NotificationsService, NotificationsRepository],
})
export class NotificationsModule {}
