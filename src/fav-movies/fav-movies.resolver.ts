import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { FavMoviesDto } from './dto/fav-movies.dto';
import { FavMoviesEntity } from './fav-movies.entity';
import { FavMoviesService } from './fav-movies.service';

@Resolver('FavMovies')
export class FavMoviesResolver {
  constructor(private favMoviesService: FavMoviesService) {}

  @Query(() => [FavMoviesDto])
  getAllMovies(
    @Args('genresIds', { type: () => [Number] }) genresIds: number[],
    @Args('year') year: string,
    @Args('voteAverage') voteAverage: number,
    @Args('page') page: number,
  ) {
    return this.favMoviesService.getAllMovies(
      genresIds,
      year,
      voteAverage,
      page,
    );
  }

  @Query(() => FavMoviesDto)
  getMovieDetails(@Args('id') id: number) {
    return this.favMoviesService.getMoviesDetails(id);
  }

  @Mutation(() => FavMoviesEntity)
  @UseGuards(AuthGuard)
  async addFavMovies(
    @Args('id') id: number,
    @Context('user') user: UserEntity,
  ) {
    return await this.favMoviesService.addFavMovies(id, user);
  }

  @Mutation(() => FavMoviesEntity)
  @UseGuards(AuthGuard)
  async updateWatched(@Args('id') id: number) {
    return await this.favMoviesService.setFavMovieAsWatched(id);
  }

  @Mutation(() => FavMoviesEntity)
  @UseGuards(AuthGuard)
  async removeFavMovies(@Args('id') id: number) {
    return this.favMoviesService.removeFavMovies(id);
  }

  @Query(() => [FavMoviesDto])
  @UseGuards(AuthGuard)
  async getFavMovies(@Context('user') user: UserEntity) {
    return this.favMoviesService.getFavMovies(user);
  }
}
