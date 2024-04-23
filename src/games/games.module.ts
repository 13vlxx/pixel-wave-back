import { Module } from '@nestjs/common';
import { AdvicesModule } from 'src/advices/advices.module';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { GamesService } from './games.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesService, GamesRepository],
  imports: [AdvicesModule],
})
export class GamesModule {}
