import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get(':postId')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiQuery({ name: 'currentUserId', required: false, type: String })
  getPostById(
    @Param('postId') postId: string,
    @Query('currentUserId') currentUserId?: string,
  ) {
    return this.postsRepository.getPostById(postId, currentUserId);
  }

  @Protect()
  @Put(':postId')
  @ApiOperation({ summary: 'Like post with id' })
  @HttpCode(204)
  updatePost(@ConnectedUser() user: user, @Param('postId') postId: string) {
    return this.postsService.toggleLike(user, postId);
  }

  @Protect()
  @Delete(':postId')
  @ApiOperation({ summary: 'Delete post with id' })
  @HttpCode(204)
  deletePost(@ConnectedUser() user: user, @Param('postId') postId: string) {
    return this.postsService.deletePost(user, postId);
  }

  @Protect()
  @Delete('comment/:commentId')
  @ApiOperation({ summary: 'Delete comment with id' })
  @HttpCode(204)
  deleteComment(
    @ConnectedUser() user: user,
    @Param('commentId') commentId: string,
  ) {
    return this.postsService.deleteComment(user, commentId);
  }
}
