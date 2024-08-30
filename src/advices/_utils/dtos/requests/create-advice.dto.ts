import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateAdviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  advice: string;

  @ApiProperty()
  @IsNumber()
  @Max(5)
  @Min(0)
  note: number;
}
