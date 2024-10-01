import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { validateEnv } from './_utils/config/config';
import { AdvicesModule } from './advices/advices.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { EmailsModule } from './emails/emails.module';
import { GamesModule } from './games/games.module';
import { HomeModule } from './home/home.module';
import { MinioModule } from './minio/minio.module';
import { NewsModule } from './news/news.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlatformsModule } from './platforms/platforms.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { SettingsModule } from './settings/settings.module';
import { StaffRequestsModule } from './staff-requests/staff-requests.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    NestjsFormDataModule.config({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    EmailsModule,
    GamesModule,
    AdvicesModule,
    CategoriesModule,
    HomeModule,
    PlatformsModule,
    NewsModule,
    PostsModule,
    SettingsModule,
    StaffRequestsModule,
    NotificationsModule,
    MinioModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
