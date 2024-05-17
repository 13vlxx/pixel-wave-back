import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { PostsModule } from 'src/posts/posts.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [GamesModule, PostsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
