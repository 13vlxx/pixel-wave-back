import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './_utils/dtos/requests/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById = (id: string) =>
    this.prismaService.user
      .findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          pseudo: true,
          profilePicture: true,
          role: true,
          createdAt: true,
        },
      })
      .catch(() => new NotFoundException('User not found'));

  findByEmail = (email: string) =>
    this.prismaService.user.findUnique({
      where: { email },
    });

  findByPseudo = (pseudo: string) =>
    this.prismaService.user.findUnique({ where: { pseudo } });

  findByCode = (code: string) =>
    this.prismaService.user
      .findFirst({
        where: { resetPasswordCode: code },
        select: {
          email: true,
          resetPasswordCodeDate: true,
        },
      })
      .catch((error) => new NotFoundException('User not found'));

  create = (createUserDto: CreateUserDto, hashedPassword: string) =>
    this.prismaService.user
      .create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          profilePicture: null,
          user_setting: {
            create: [{ id_setting: 'clxegm11n000012xgjjriob9w' }],
          },
        },
      })
      .catch((error) => new ConflictException('Email already exists'));

  updateCode = (
    email: string,
    resetPasswordCode: string,
    resetPasswordCodeDate: number,
  ) =>
    this.prismaService.user
      .update({
        where: { email },
        data: { resetPasswordCode, resetPasswordCodeDate },
      })
      .catch((error) => new NotFoundException('Email not found'));

  updatePassword = (email: string, password: string) =>
    this.prismaService.user
      .update({
        where: { email },
        data: {
          password,
          resetPasswordCode: null,
          resetPasswordCodeDate: null,
        },
      })
      .catch((error) => new NotFoundException('Email not found'));
}
