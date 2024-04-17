import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './_utils/config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv, isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
