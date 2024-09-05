import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { EnvironmentVariables } from '../_utils/config/config';

@Injectable()
export class MinioService {
  logger = new Logger(MinioService.name);

  private minioClient: Client;
  private readonly minioBucketName: string;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {
    let minioUrl = this.configService.get('MINIO_URL');
    if (minioUrl.slice(0, 8) === 'https://') {
      minioUrl = minioUrl.slice(8);
    }

    this.logger.debug(`minio client -- URL : ${minioUrl}`);

    this.minioClient = new Client({
      endPoint: minioUrl,
      port: 9000,
      useSSL: false,
      accessKey: this.configService.get('MINIO_USER'),
      secretKey: this.configService.get('MINIO_PASSWORD'),
    });

    this.minioBucketName = this.configService.get('MINIO_BUCKET_NAME');

    this.minioClient
      .bucketExists(this.minioBucketName)
      .then((exist) => {
        if (!exist)
          return this.minioClient
            .makeBucket(this.minioBucketName, 'eu-west-2')
            .then(() =>
              this.logger.debug(`Bucket '${this.minioBucketName}' created`),
            );
      })
      .catch((err) => this.logger.error(err));
  }
}
