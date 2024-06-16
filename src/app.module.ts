import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { validateEnv } from './_utils/config/config';
import { AdvicesModule } from './advices/advices.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { EmailsModule } from './emails/emails.module';
import { GamesModule } from './games/games.module';
import { HomeModule } from './home/home.module';
import { NewsModule } from './news/news.module';
import { PlatformsModule } from './platforms/platforms.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { SettingsModule } from './settings/settings.module';
import { StaffRequestsModule } from './staff-requests/staff-requests.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
