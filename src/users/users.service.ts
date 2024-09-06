import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GamesRepository } from 'src/games/games.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { SettingsService } from 'src/settings/settings.service';
import { MinioMapper } from '../minio/minio.mapper';
import { MinioService } from '../minio/minio.service';
import { UpdateProfilePictureDto } from './_utils/dtos/requests/update-profile-picture.dto';
import { UpdateSettingsDto } from './_utils/dtos/requests/update-settings.dto';
import { GetUserDto } from './_utils/dtos/responses/get-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly gamesRepository: GamesRepository,
    private readonly postsRepository: PostsRepository,
    private readonly settingsService: SettingsService,
    private readonly minioService: MinioService,
    private readonly minioMapper: MinioMapper,
  ) {}

  async getMe(user: user) {
    const u: GetUserDto = await this.usersRepository.findById(user.id);
    if (!u) throw new NotFoundException('User not found');
    const receiveEmails = await this.settingsService.checkReceiveEmails(user);
    const favoriteGames = await this.gamesRepository.findUserFavoriteGames(
      user.id,
    );
    const posts = await this.postsRepository.findAllUserPosts(user.id, user.id);
    return {
      user: u,
      receiveEmails,
      favoriteGames,
      posts: posts,
    };
  }

  async getUserProfile(targetId: string, currentUserId?: string) {
    const u: GetUserDto = await this.usersRepository.findById(targetId);
    if (!u) throw new NotFoundException('User not found');
    const favoriteGames =
      await this.gamesRepository.findUserFavoriteGames(targetId);
    const posts = await this.postsRepository.findAllUserPosts(
      targetId,
      currentUserId,
    );

    return {
      user: u,
      favoriteGames,
      posts: posts,
    };
  }

  async updateProfile(user: user, updateSettingsDto: UpdateSettingsDto) {
    const { receiveEmails } = updateSettingsDto;
    if (updateSettingsDto.password != null)
      await this.usersRepository.updatePassword(
        user.email,
        bcrypt.hashSync(updateSettingsDto.password, 10),
      );

    return this.settingsService.toggleReceiveEmails(user, receiveEmails);
  }

  async updateProfilePicture(
    user: user,
    updateProfilePictureDto: UpdateProfilePictureDto,
  ) {
    const key = this.minioMapper.toUserProfileImageKey(user.id);
    const uploadedFile = await this.minioService.uploadFile(
      updateProfilePictureDto.profilePicture,
      key,
    );
    if (!uploadedFile)
      throw new NotFoundException(
        'Erreur lors de la modification de la photo de profil',
      );
    await this.usersRepository.updateProfilePicture(user.id, uploadedFile.key);

    return uploadedFile.url;
  }
}
