import { PrismaService } from 'src/prisma/prisma.service';

export class NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
