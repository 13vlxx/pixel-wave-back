import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateStaffRequestDto {
  @IsString()
  @MinLength(20)
  @IsNotEmpty()
  readonly content: string;
}
