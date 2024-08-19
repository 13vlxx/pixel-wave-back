import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GamesRepository } from 'src/games/games.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { SettingsService } from 'src/settings/settings.service';
import { UpdateSettingsDto } from './_utils/dtos/requests/update-settings.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly gamesRepository: GamesRepository,
    private readonly postsRepository: PostsRepository,
    private readonly settingsService: SettingsService,
  ) {}

  async getMe(user: user) {
    const u = await this.usersRepository.findById(user.id);
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

  async getUserProfile(user: user, targetId: string) {
    const u = await this.usersRepository.findById(targetId);
    if (!u) throw new NotFoundException('User not found');
    const favoriteGames =
      await this.gamesRepository.findUserFavoriteGames(targetId);
    const posts = await this.postsRepository.findAllUserPosts(
      targetId,
      user.id,
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
}
