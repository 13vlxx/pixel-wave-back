import { Injectable } from '@nestjs/common';
import { UserSchema } from 'src/users/_utils/user.schema';
import { AdvicesRepository } from './advices.repository';

@Injectable()
export class AdvicesService {
  constructor(private readonly advicesRepository: AdvicesRepository) {}

  getAdvices() {
    return this.advicesRepository.findAll();
  }

  async checkIfAlreadyPostedAdvice(user: UserSchema, gameId: string) {
    const check = await this.advicesRepository.checkIfUserAlreadyPostedAdvice(
      user.id,
      gameId,
    );

    return check ? check : null;
  }
}
