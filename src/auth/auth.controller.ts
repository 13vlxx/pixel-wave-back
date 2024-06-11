import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';
import { Protect } from './_utils/decorators/protect.decorator';
import { ForgetPasswordDto } from './_utils/dtos/requests/forget-password.dto';
import { LoginUserDto } from './_utils/dtos/requests/login-user.dto';
import { ResetPasswordDto } from './_utils/dtos/requests/reset-password.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register with email, pseudo and password' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('forgot-password')
  @HttpCode(204)
  @ApiOperation({ summary: 'Send an email to reset the password' })
  forgotPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgotPassword(forgetPasswordDto);
  }

  @Protect()
  @Post('reset-password')
  @HttpCode(204)
  @ApiOperation({ summary: 'Reset the password' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
