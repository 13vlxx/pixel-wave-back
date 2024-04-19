import { Injectable } from '@nestjs/common';
import { createUserDto } from './_utils/dtos/requests/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create = (createUserDto: createUserDto) =>
    this.usersRepository.create(createUserDto);
}
