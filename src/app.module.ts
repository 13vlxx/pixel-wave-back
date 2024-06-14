import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { validateEnv } from './_utils/config/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './emails/emails.module';
import { GamesModule } from './games/games.module';
import { AdvicesModule } from './advices/advices.module';
import { CategoriesModule } from './categories/categories.module';
import { HomeModule } from './home/home.module';
import { PlatformsModule } from './platforms/platforms.module';
import { NewsModule } from './news/news.module';
import { PostsModule } from './posts/posts.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    EmailsModule,
    GamesModule,
    AdvicesModule,
    CategoriesModule,
    HomeModule,
    PlatformsModule,
    NewsModule,
    PostsModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
