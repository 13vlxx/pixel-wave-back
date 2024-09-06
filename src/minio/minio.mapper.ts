import { Injectable } from '@nestjs/common';

@Injectable()
export class MinioMapper {
  toUserProfileImageKey = (userId: string) => `users/${userId}/profile-picture`;
  toCategoryLogoImageKey = (categoryId: string) =>
    `categories/${categoryId}/image`;
  toPlatformLogoImageKey = (platformId: string) =>
    `platforms/${platformId}/image`;
  toGameLogoImageKey = (gameId: string) => `games/${gameId}/logo-image`;
  toPostImageKey = (postId: string) => `posts/${postId}/image`;
  toDefaultsImageKey = (key: string) => `defaults/${key}`;
}
