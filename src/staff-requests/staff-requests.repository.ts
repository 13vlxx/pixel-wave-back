import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStaffRequestDto } from './_utils/dtos/requests/create-staff-request.dto';

@Injectable()
export class StaffRequestsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getLastRequestForUser = (userId: string) =>
    this.prismaService.staff_request.findFirst({
      where: {
        id_user: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

  createRequest = (id: string, createStaffRequestDto: CreateStaffRequestDto) =>
    this.prismaService.staff_request.create({
      data: {
        id_user: id,
        content: createStaffRequestDto.content,
      },
    });
}
