import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  test() {
    return this.newsRepository.findAll();
  }
}
