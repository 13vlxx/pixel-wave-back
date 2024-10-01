import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AdminService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getDashboardData() {
    const users = await this.usersRepository.getBackOfficeUsers();

    return {
      users,
    };
  }
}
