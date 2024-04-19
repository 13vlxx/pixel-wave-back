import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(createUserDto: createUserDto) {
    const { email, pseudo, password } = createUserDto;

    if (await this.usersRepository.findByEmail(email))
      throw new ConflictException('Email already exists');
    if (await this.usersRepository.findByPseudo(pseudo))
      throw new ConflictException('Pseudo already exists');

    const hash = await bcrypt.hash(password, 10);

    return await this.usersRepository.create(createUserDto, hash);
  }
}
