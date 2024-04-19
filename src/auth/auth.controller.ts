import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: createUserDto) {
    return this.authService.register(createUserDto);
  }
}
