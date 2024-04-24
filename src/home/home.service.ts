import { Injectable } from '@nestjs/common';
import { AdvicesRepository } from 'src/advices/advices.repository';
import { GamesRepository } from 'src/games/games.repository';

@Injectable()
export class HomeService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly advicesRepository: AdvicesRepository,
  ) {}

  async homepage() {
    const games = await this.gamesRepository.findAllLite();
    const advices = await this.advicesRepository.findAll();
    return { games, advices };
  }
}
