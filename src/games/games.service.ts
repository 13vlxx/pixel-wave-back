import { Injectable, NotFoundException } from '@nestjs/common';
import { GamesRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async findGameByName(name: string) {
    const game = await this.gamesRepository.findGameByName(name);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
}
