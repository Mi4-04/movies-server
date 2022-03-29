import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FavMoviesDto } from './dto/fav-movies.dto';
import { API_URL } from 'src/constant/constant';

@Injectable()
export class FavMoviesService {
  private apiUrl = API_URL;

  constructor(private http: HttpService) {}

  getAllMovies(
    genresIds: number[],
    year: string,
    voteAverage: number,
    page: number,
  ): Observable<AxiosResponse<FavMoviesDto[]>> {
    return this.http
      .get(
        `${this.apiUrl}/discover/movie?api_key=${
          process.env.API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresIds.join()}&year=${year}&vote_average.gte=${voteAverage}`,
      )
      .pipe(map((res) => res.data.results));
  }

  getMoviesDetails(id: number): Observable<AxiosResponse<FavMoviesDto>> {
    return this.http
      .get(
        `${this.apiUrl}/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
      )
      .pipe(map((res) => res.data));
  }
}
