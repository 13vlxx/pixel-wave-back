import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GamesRepository } from 'src/games/games.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { SettingsService } from 'src/settings/settings.service';
import { UpdateSettingsDto } from './_utils/dtos/requests/update-settings.dto';
import { UserSchema } from './_utils/user.schema';
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
    const recieveEmails = await this.settingsService.checkRecieveEmails(user);
    const favoriteGames = await this.gamesRepository.findUserFavoriteGames(
      user.id,
    );
    const posts = await this.postsRepository.findAllUserPosts(user.id, user.id);
    return {
      user: u,
      recieveEmails,
      favoriteGames,
      posts: posts,
    };
  }

  async updateProfile(user: user, updateSettingsDto: UpdateSettingsDto) {
    const { recieveEmails } = updateSettingsDto;
    if (updateSettingsDto.password != null)
      await this.usersRepository.updatePassword(
        user.email,
        bcrypt.hashSync(updateSettingsDto.password, 10),
      );

    return this.settingsService.toggleRecieveEmails(user, recieveEmails);
  }

  async getUserProfile(connectedUser: UserSchema, userId: string) {
    console.log(connectedUser, connectedUser.id);
    const u = await this.usersRepository.findById(userId);
    const favoriteGames = await this.gamesRepository.findUserFavoriteGames(
      connectedUser.id,
    );
    const posts = await this.postsRepository.findAllUserPosts(
      userId,
      connectedUser.id,
    );

    return {
      user: u,
      favoriteGames,
      posts: posts,
    };
  }
}
