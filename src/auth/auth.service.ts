import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { EmailsService } from 'src/emails/emails.service';
import { CreateUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { ForgetPasswordDto } from './_utils/dtos/requests/forget-password.dto';
import { LoginUserDto } from './_utils/dtos/requests/login-user.dto';
import { ResetPasswordDto } from './_utils/dtos/requests/reset-password.dto';
import { JwtPayload } from './_utils/jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly emailsService: EmailsService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, pseudo, password } = createUserDto;

    if (await this.usersRepository.findByEmail(email))
      throw new ConflictException('Email already exists');
    if (await this.usersRepository.findByPseudo(pseudo))
      throw new ConflictException('Pseudo already exists');

    const hash = await bcrypt.hash(password, 10);

    return await this.usersRepository.create(createUserDto, hash);
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new ConflictException('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new ConflictException('Password is incorrect');

    return {
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        profilePicture: user.profilePicture,
        role: user.role,
        createdAt: user.createdAt,
      },
      token: this.createToken(user),
    };
  }

  async forgotPassword(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.usersRepository.findByEmail(
      forgetPasswordDto.email,
    );
    if (!user) throw new NotFoundException('Email not found');

    const hashedCode = await bcrypt.hash(user.pseudo, 10);
    const expirationCodeDate = dayjs().unix() + 180;

    await this.usersRepository.updateCode(
      user.email,
      hashedCode,
      expirationCodeDate,
    );

    return this.emailsService.sendEmailLostPassword(
      user.email,
      hashedCode,
      expirationCodeDate,
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersRepository.findByCode(resetPasswordDto.code);
    if (!user || user instanceof NotFoundException)
      throw new NotFoundException('Invalid code');

    if (user.resetPasswordCodeDate < dayjs().unix())
      throw new UnauthorizedException('Code expired, please try again');

    const hash = await bcrypt.hash(resetPasswordDto.password, 10);

    await this.usersRepository.updatePassword(user.email, hash);
  }

  private createToken(user: JwtPayload) {
    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
