import { Injectable } from '@nestjs/common';

@Injectable()
export class MinioMapper {
  toGetMinioFileDto = (minioFile) => ({
    key: minioFile.key,
    fileName: minioFile.fileName,
    mimeType: minioFile.mimeType,
    size: minioFile.size,
  });
  toUserProfileImageKey = (userId: string) => `users/${userId}/profile-picture`;
  toCategoryLogoImageKey = (categoryId: string) =>
    `categories/${categoryId}/image`;
  toPlatformLogoImageKey = (platformId: string) =>
    `platforms/${platformId}/image`;
  toGameLogoImageKey = (gameId: string) => `games/${gameId}/logo-image`;
  toDefaultsImageKey = (key: string) => `defaults/${key}`;
}
