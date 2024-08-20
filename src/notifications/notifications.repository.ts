import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createLikeNotification = (id: string, postId: string) =>
    this.prismaService.user_notification
      .create({
        data: {
          id_user: id,
          destinationId: postId,
          notificationType: 'NEW_LIKE',
        },
      })
      .catch((error) => {
        console.log(error);
      });

  deleteLikeNotification = (id: string, postId: string) =>
    this.prismaService.user_notification.deleteMany({
      where: {
        id_user: id,
        destinationId: postId,
        notificationType: 'NEW_LIKE',
      },
    });
}
