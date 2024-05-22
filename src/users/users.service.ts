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
    const favoriteGames = await this.gamesRepository.findUserFavoriteGames(
      user.id,
    );
    const posts = await this.postsRepository.findAllUserPosts(user.id, user.id);

    return {
      user: u,
      favoriteGames,
      posts: posts,
    };
  }
}
