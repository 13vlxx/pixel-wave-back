import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { LoginUserDto } from './_utils/dtos/requests/login-user.dto';
import { JwtPayload } from './_utils/jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
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

  private createToken(user: JwtPayload) {
    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
