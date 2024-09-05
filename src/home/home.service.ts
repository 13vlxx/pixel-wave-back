import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { GamesRepository } from 'src/games/games.repository';
import { PlatformsRepository } from 'src/platforms/platforms.repository';
import { AdvicesService } from '../advices/advices.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly advicesService: AdvicesService,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly platformsRepository: PlatformsRepository,
  ) {}

  async homepage() {
    const games = await this.gamesRepository.findAllLite();
    const advices = await this.advicesService.getAdvices();
    const categories = await this.categoriesRepository.findAll();
    const platforms = await this.platformsRepository.findAll();
    return { games, advices, categories, platforms };
  }
}
