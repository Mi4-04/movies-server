import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FavMoviesDto } from './dto/fav-movies.dto';
import { API_URL } from 'src/constant/constant';
import { UserEntity } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavMoviesEntity } from './fav-movies.entity';
import { lastValueFrom, map } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FavMoviesService {
  private apiUrl = API_URL;

  constructor(
    @InjectRepository(FavMoviesEntity)
    private favMoviesRepository: Repository<FavMoviesEntity>,
    private userService: UserService,
    private http: HttpService,
  ) {}

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

  async addFavMovies(
    id: number,
    { login }: UserEntity,
  ): Promise<FavMoviesEntity> {
    const user = await this.userService.getUserByLogin(login);
    try {
      const favMoviesEntity = await this.favMoviesRepository.save({
        moviesId: id,
        watched: false,
        user,
      });
      return favMoviesEntity;
    } catch (e) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async setFavMovieAsWatched(moviesId: number): Promise<FavMoviesEntity> {
    const movie = await this.favMoviesRepository.findOne({ moviesId });
    movie.watched = true;

    try {
      await movie.save();
      return movie;
    } catch (e) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeFavMovies(moviesId: number): Promise<FavMoviesEntity> {
    const movie = await this.favMoviesRepository.findOne({ moviesId });

    if (!movie) {
      throw new BadRequestException();
    }

    await this.favMoviesRepository.delete(movie.id);
    return movie;
  }

  async getFavMovies({
    login,
  }: UserEntity): Promise<AxiosResponse<FavMoviesDto, any>[]> {
    const user = await this.userService.getUserByLogin(login);

    const movies = await this.favMoviesRepository.find({
      where: { user: user.id },
    });
    const result = await Promise.all(
      movies.map((movie) => {
        let moviesDetails = this.getMoviesDetails(movie.moviesId);
        let movieIdData = lastValueFrom(moviesDetails);
        return movieIdData;
      }),
    );

    return result;
  }
}
