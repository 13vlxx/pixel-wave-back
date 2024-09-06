import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsFile()
  @MaxFileSize(8e6, { message: 'Ficher trop volumineux, maximum 8mo' })
  @HasMimeType(['image/*'])
  photo?: MemoryStoredFile;
}
