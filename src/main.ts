import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariables } from './_utils/config/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .setGlobalPrefix('api')
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    .enableCors();

  const config = new DocumentBuilder()
    .setTitle('Pixel Wave API')
    .setDescription('Routes description of the Pixel Wave API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  await app.listen(configService.get('PORT'));
  setTimeout(() => {
    new Logger().debug(
      `Server running on http://localhost:${configService.get('PORT')}/api`,
    );
    new Logger().verbose(
      `Swagger : http://localhost:${configService.get('PORT')}/api/doc`,
    );
  }, 1000);
}
bootstrap();
