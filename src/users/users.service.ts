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
    const postsWithLikes = posts.map((post) => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      photo: post.photo,
      user: {
        id: post.user.id,
        pseudo: post.user.pseudo,
        profilePicture: post.user.profilePicture,
      },
      likes: post._count.post_like,
    }));

    return {
      user: u,
      favoriteGames,
      posts: postsWithLikes,
    };
  }
}
