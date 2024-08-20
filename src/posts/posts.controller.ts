import { Controller, Get, HttpCode, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsRepository: PostsRepository,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({ name: 'currentUserId', required: false, type: String })
  getAllPosts(@Query('currentUserId') currentUserId?: string) {
    return this.postsRepository.getPostsFeed(currentUserId);
  }

  @Protect()
  @Put(':postId')
  @ApiOperation({ summary: 'Update post with id' })
  @HttpCode(204)
  updatePost(@ConnectedUser() user: user, @Param('postId') postId: string) {
    return this.postsService.toggleLike(user, postId);
  }
}
