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

  //ONLY FOR TEST
  @Protect()
  @Post('upload')
  @FormDataRequest()
  uploadFile(
    @ConnectedUser() user: user,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.minioService.uploadFile(
      uploadFileDto.file,
      'platforms/clxeiq5xu0001guqh0zdl4mrl/image',
    );
  }

  @Protect()
  @Delete(':key')
  delete(@Param('key') key: string) {
    return this.minioService.delteFiles([key]);
  }
}
