import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'Password should be at least 6 characters, including 1 lowercase letter, 1 uppercase letter and 1 number',
    },
  )
  password: string;
}
