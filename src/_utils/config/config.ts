import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { exit } from 'process';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number = 3000;

  @IsString()
  MYSQL_DATABASE_URL: string;

  @IsString()
  MINIO_URL: string;

  @IsString()
  MINIO_USER: string;

  @IsString()
  MINIO_PASSWORD: string;

  @IsString()
  MINIO_BUCKET_NAME: string = 'pixelwave';

  @IsString()
  JWT_SECRET: string = 'PiXeeelWavEeSeCreeT';

  @IsString()
  JWT_EXPIRATION_TIME: string = '7d';

  @IsString()
  FRONT_URL: string;

  @IsString()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  SMTP_USERNAME: string;

  @IsString()
  SMTP_PASSWORD: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    new Logger(validateEnv.name).error(errors.toString());
    exit();
  }
  return validatedConfig;
}
