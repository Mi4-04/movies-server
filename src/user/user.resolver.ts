import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { FavMoviesEntity } from 'src/fav-movies/fav-movies.entity';
import { SignInInfoDto } from './dto/sign-in-info.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => SignInInfoDto)
  async signIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ) {
    return await this.userService.signIn(login, password);
  }

  @Mutation(() => FavMoviesEntity)
  @UseGuards(AuthGuard)
  async addFavMovies(
    @Args('id') id: number,
    @Context('user') user: UserEntity,
  ) {
    return await this.userService.addFavMovies(id, user);
  }

  @Mutation(() => FavMoviesEntity)
  @UseGuards(AuthGuard)
  async updateWatched(
    @Args('id') id: number,
    @Context('user') user: UserEntity,
  ) {
    return await this.userService.setFavMovieAsWatched(id, user);
  }

  @Mutation(() => FavMoviesEntity)
  @UseGuards(AuthGuard)
  async removeFavMovies(@Args('id') id: number) {
    return this.userService.removeFavMovies(id);
  }
}
