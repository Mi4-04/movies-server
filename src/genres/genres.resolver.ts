import { Resolver } from '@nestjs/graphql';
import { GenresService } from './genres.service';

@Resolver('Genres')
export class GenresResolver {
  constructor(private genreService: GenresService) {}
}
