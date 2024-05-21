import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsMapper } from './posts.mapper';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostsMapper],
  exports: [PostsService, PostsRepository, PostsMapper],
})
export class PostsModule {}
