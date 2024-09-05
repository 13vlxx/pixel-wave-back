import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UploadFileDto {
  @IsFile()
  @MaxFileSize(1e9)
  @HasMimeType(['image/*'])
  file: MemoryStoredFile;
}
