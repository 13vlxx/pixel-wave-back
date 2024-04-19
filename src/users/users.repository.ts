import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './_utils/dtos/requests/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById = (id: string) =>
    this.prismaService.user.findUnique({ where: { id } });

  findByEmail = (email: string) =>
    this.prismaService.user.findUnique({
      where: { email },
    });

  findByPseudo = (pseudo: string) =>
    this.prismaService.user.findUnique({ where: { pseudo } });

  create = (createUserDto: createUserDto, hashedPassword: string) =>
    this.prismaService.user
      .create({ data: { ...createUserDto, password: hashedPassword } })
      .catch((error) => new ConflictException('Email already exists'));
}
