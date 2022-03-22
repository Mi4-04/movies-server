import { FavMoviesDto } from "src/fav-movies/dto/fav-movies.dto";

export interface UserDto {
  id: number;
  login: string;
  password: string;
  genres?: number[];
  favMovies?: FavMoviesDto[];
}
