import { forwardRef, Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { PostsModule } from 'src/posts/posts.module';
import { SettingsModule } from 'src/settings/settings.module';
import { MinioModule } from '../minio/minio.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    GamesModule,
    forwardRef(() => PostsModule),
    SettingsModule,
    MinioModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
