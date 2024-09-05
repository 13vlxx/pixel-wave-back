import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { ConnectedUser } from '../auth/_utils/decorators/connected-user.decorator';
import { Protect } from '../auth/_utils/decorators/protect.decorator';
import { UploadFileDto } from './_utils/dtos/upload-file.dto';
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
  @Post('upload')
  @FormDataRequest()
  uploadFile(
    @ConnectedUser() user: user,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.minioService.uploadFile(
      uploadFileDto.file,
      'games/clxd9djfq00008rfsl39noq34/logo-image',
    );
  }

  @Protect()
  @Delete(':key')
  delete(@Param('key') key: string) {
    return this.minioService.delteFiles([key]);
  }
}
