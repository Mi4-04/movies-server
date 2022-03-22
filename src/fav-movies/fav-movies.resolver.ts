import { Query, Resolver, Args } from '@nestjs/graphql';
import { FavMoviesDto } from './dto/fav-movies.dto';
import { FavMoviesService } from './fav-movies.service';

@Resolver('FavMovies')
export class FavMoviesResolver {
  constructor(private favMoviesService: FavMoviesService) {}

  @Query(() => [FavMoviesDto])
  movies(
    @Args('genresIds', { type: () => [Number] }) genresIds: number[],
    @Args('year') year: string,
    @Args('voteAverage') voteAverage: number,
  ) {
    return this.favMoviesService.getAllMovies(genresIds, year, voteAverage);
  }

  @Query(() => FavMoviesDto)
  movie(@Args('id') id: number) {
    return this.favMoviesService.getMoviesDetals(id);
  }
}
