import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Protect } from '../auth/_utils/decorators/protect.decorator';
import { MinioMapper } from './minio.mapper';
import { MinioService } from './minio.service';

@ApiTags('Bucket')
@Controller('minio')
export class MinioController {
  constructor(
    private readonly minioService: MinioService,
    private readonly minioMapper: MinioMapper,
  ) {}

  @Protect()
  @Delete(':key')
  delete(@Param('key') key: string) {
    return this.minioService.delteFiles([key]);
  }
}
