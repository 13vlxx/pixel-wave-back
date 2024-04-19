import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;
  @IsString()
  pseudo: string;
  @IsString()
  password: string;
}
