export interface UserDto {
  id: number;
  login: string;
  password: string;
  genres?: number[];
  favMovies?: number[];
}
