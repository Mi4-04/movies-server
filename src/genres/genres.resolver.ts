import { Resolver, Query } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genres.dto';

@Resolver('Genres')
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query(() => [GenreDto])
  genres() {
    return this.genresService.getGenres();
  }
}
