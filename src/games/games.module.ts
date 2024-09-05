import { Module } from '@nestjs/common';
import { AdvicesModule } from 'src/advices/advices.module';
import { MinioModule } from '../minio/minio.module';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { GamesService } from './games.service';

@Module({
  imports: [AdvicesModule, MinioModule],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
