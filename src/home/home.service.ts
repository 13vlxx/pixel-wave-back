import { Injectable } from '@nestjs/common';
import { AdvicesRepository } from 'src/advices/advices.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { GamesRepository } from 'src/games/games.repository';
import { PlatformsRepository } from 'src/platforms/platforms.repository';

@Injectable()
export class HomeService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly advicesRepository: AdvicesRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly platformsRepository: PlatformsRepository,
  ) {}

  async homepage() {
    const games = await this.gamesRepository.findAllLite();
    const advices = await this.advicesRepository.findAll();
    const categories = await this.categoriesRepository.findAll();
    const platforms = await this.platformsRepository.findAll();
    return { games, advices, categories, platforms };
  }
}
