import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  photo?: File;
}
