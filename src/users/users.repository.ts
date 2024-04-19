import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById = (id: string) =>
    this.prismaService.user.findUnique({ where: { id } });

  findByEmail = (email: string) =>
    this.prismaService.user.findUnique({ where: { email } });

  create = (createUserDto: any) =>
    this.prismaService.user
      .create({ data: createUserDto })
      .catch((error) => new ConflictException('Email already exists'));
}
