import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GenreDto } from './dto/genres.dto';

@Injectable()
export class GenresService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpService) {}

  getGenres(): Observable<AxiosResponse<GenreDto[]>> {
    return this.http
      .get(`${this.apiUrl}/genre/movie/list?api_key=${process.env.API_KEY}`)
      .pipe(map((res) => res.data.genres));
  }
}
