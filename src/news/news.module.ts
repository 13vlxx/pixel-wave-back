import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
  exports: [NewsService, NewsRepository],
})
export class NewsModule {}
