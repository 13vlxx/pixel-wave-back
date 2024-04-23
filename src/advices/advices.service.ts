import { Injectable } from '@nestjs/common';
import { AdvicesRepository } from './advices.repository';

@Injectable()
export class AdvicesService {
  constructor(private readonly advicesRepository: AdvicesRepository) {}

  getAdvices() {
    return this.advicesRepository.findAll();
  }
}
