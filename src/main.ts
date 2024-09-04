import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { EnvironmentVariables } from './_utils/config/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const log = new Logger();

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

  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document, options);

  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  await app.listen(configService.get('PORT'));
  setTimeout(() => {
    new Logger().error(
      `Server running on http://localhost:${configService.get('PORT')}/api`,
    );
    log.error(
      `Swagger : http://localhost:${configService.get('PORT')}/api/doc`,
    );
    log.error(`S3 Bucket : http://localhost:8900`);
  }, 1000);
}
bootstrap();
