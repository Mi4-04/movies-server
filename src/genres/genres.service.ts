import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GenreDto } from './dto/genres.dto';
import { API_URL } from 'src/constant/constant';

@Injectable()
export class GenresService {
  private apiUrl = API_URL

  constructor(private http: HttpService) {}

  getGenres(): Observable<AxiosResponse<GenreDto[]>> {
    return this.http
      .get(`${this.apiUrl}/genre/movie/list?api_key=${process.env.API_KEY}`)
      .pipe(map((res) => res.data.genres));
  }
}
