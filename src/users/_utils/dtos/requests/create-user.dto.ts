import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  pseudo: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
