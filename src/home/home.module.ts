import { Module } from '@nestjs/common';
import { AdvicesModule } from 'src/advices/advices.module';
import { GamesModule } from 'src/games/games.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
  imports: [AdvicesModule, GamesModule],
})
export class HomeModule {}
