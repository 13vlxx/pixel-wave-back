import { Injectable } from '@nestjs/common';
import { GamesRepository } from 'src/games/games.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { UserSchema } from './_utils/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly gamesRepository: GamesRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async getProfile(user: UserSchema) {
    const u = await this.usersRepository.findById(user.id);
    const games = await this.gamesRepository.findUserFavoriteGames(user.id);
    const favoriteGames = games.map((fav) => ({
      id: fav.game.id,
      name: fav.game.name,
      logo: fav.game.logo,
    }));
    const posts = await this.postsRepository.findAllUserPosts(user.id);
    return {
      user: u,
      favoriteGames,
      posts,
    };
  }
}
