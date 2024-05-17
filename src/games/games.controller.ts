import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { UserSchema } from 'src/users/_utils/user.schema';
import { CreateAdviceDto } from './_utils/dtos/requests/create-advice.dto';
import { GamesService } from './games.service';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':name')
  @ApiOperation({ summary: 'Find a game by name' })
  findGameByName(@Param('name') name: string) {
    return this.gamesService.findGameByName(name);
  }

  @Protect()
  @Get(':id/favorite')
  @ApiOperation({ summary: 'Check if a game is in user favorites' })
  checkIfFavorite(
    @ConnectedUser() user: UserSchema,
    @Param('id') gameId: string,
  ) {
    return this.gamesService.checkIfFavorite(user, gameId);
  }

  @Protect()
  @Put(':id/favorite')
  @ApiOperation({ summary: 'Add a game to user favorites' })
  toggleFavorite(
    @ConnectedUser() user: UserSchema,
    @Param('id') gameId: string,
  ) {
    return this.gamesService.toggleFavorite(user, gameId);
  }

  @Protect()
  @Post(':id/advice')
  @ApiOperation({ summary: 'Post advice for a game' })
  newAdvice(
    @ConnectedUser() user: UserSchema,
    @Body() createAdviceDto: CreateAdviceDto,
    @Param('id') gameId: string,
  ) {
    return this.gamesService.newAdvice(user, createAdviceDto, gameId);
  }

  @Protect()
  @Put(':id/advice')
  @ApiOperation({ summary: 'Post advice for a game' })
  updateAdvice(
    @ConnectedUser() user: UserSchema,
    @Body() createAdviceDto: CreateAdviceDto,
    @Param('id') gameId: string,
  ) {
    return this.gamesService.updateAdvice(user, createAdviceDto, gameId);
  }
}
