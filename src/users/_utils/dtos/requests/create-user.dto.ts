import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  pseudo: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}