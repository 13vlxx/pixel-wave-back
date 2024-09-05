import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as exifr from 'exifr';
import { Client } from 'minio';
import { MemoryStoredFile } from 'nestjs-form-data';
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

  async uploadFile(file: MemoryStoredFile, key: string) {
    const exifData = await exifr.parse(file.buffer, { translateValues: false });
    await this.minioClient.putObject(
      this.minioBucketName,
      key,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype },
    );

    const url = await this.getPresignedUrl(key);

    return {
      key: key,
      fileName: file.originalName,
      mimeType: file.mimetype,
      createdAt:
        exifData?.DateTimeOriginal ?? exifData?.CreateDate ?? new Date(),
      size: file.size,
      url: url,
    };
  }

  getPresignedUrl = async (key: string): Promise<string> =>
    this.minioClient.presignedGetObject(this.minioBucketName, key);

  delteFiles = (keys: string[]) =>
    this.minioClient?.removeObjects(this.minioBucketName, keys);
}
