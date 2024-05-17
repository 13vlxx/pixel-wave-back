import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdvicesRepository } from 'src/advices/advices.repository';
import { UserSchema } from 'src/users/_utils/user.schema';
import { CreateAdviceDto } from './_utils/dtos/requests/create-advice.dto';
import { GamesRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly advicesRepository: AdvicesRepository,
  ) {}

  async findGameByName(name: string) {
    const game = await this.gamesRepository.findGameByName(name);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async checkIfFavorite(user: UserSchema, gameId: string) {
    const fav = await this.gamesRepository.checkIfFavorite(user.id, gameId);
    return fav ? true : false;
  }

  async newAdvice(
    user: UserSchema,
    createAdviceDto: CreateAdviceDto,
    gameId: string,
  ) {
    const advice = await this.advicesRepository.checkIfUserAlreadyPostedAdvice(
      user.id,
      gameId,
    );

    if (advice)
      throw new ConflictException('You already posted an advice for this game');

    return this.advicesRepository.createAdvice(
      user.id,
      gameId,
      createAdviceDto,
    );
  }

  async updateAdvice(
    user: UserSchema,
    updateAdviceDto: CreateAdviceDto,
    gameId: string,
  ) {
    const advice = await this.advicesRepository.checkIfUserAlreadyPostedAdvice(
      user.id,
      gameId,
    );

    if (!advice)
      throw new NotFoundException('You did not post an advice for this game');

    if (advice.id_user !== user.id)
      throw new ConflictException('Imposible update');

    return this.advicesRepository.updateAdvice(
      user.id,
      gameId,
      updateAdviceDto,
    );
  }

  async toggleFavorite(user: UserSchema, gameId: string) {
    const fav = await this.gamesRepository.checkIfFavorite(user.id, gameId);
    if (fav) {
      this.gamesRepository.removeFavorite(user.id, gameId);
      return false;
    } else {
      this.gamesRepository.addFavorite(user.id, gameId);
      return true;
    }
  }
}
