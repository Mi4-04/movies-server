import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FavMoviesDto } from './dto/fav-movies.dto';

@Injectable()
export class FavMoviesService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpService) {}

  getAllMovies(
    genresIds: number[],
    year: string,
    voteAverage: number,
  ): Observable<AxiosResponse<FavMoviesDto[]>> {
    return this.http
      .get(
        `${this.apiUrl}/discover/movie?api_key=${
          process.env.API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genresIds.join()}&year=${year}&vote_average.gte=${voteAverage}`,
      )
      .pipe(map((res) => res.data.results));
  }

  getMoviesDetals(id: number): Observable<AxiosResponse<FavMoviesDto>> {
    return this.http
      .get(
        `${this.apiUrl}/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
      )
      .pipe(map((res) => res.data));
  }

}
