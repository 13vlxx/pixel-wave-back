import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
}
