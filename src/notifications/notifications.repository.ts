import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getUserNotifications = (id: string) =>
    this.prismaService.user_notification.findMany({
      where: { id_user: id },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            pseudo: true,
            profilePicture: true,
            role: true,
          },
        },
        notificationType: true,
        destinationId: true,
        isRead: true,
        createdAt: true,
      },
    });

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

  deletePostNotifications = (postId: string) =>
    this.prismaService.user_notification.deleteMany({
      where: {
        destinationId: postId,
      },
    });
}
