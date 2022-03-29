import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { SignInInfoDto } from './dto/sign-in-info.dto';
import { FavMoviesService } from 'src/fav-movies/fav-movies.service';
import { FavMoviesEntity } from 'src/fav-movies/fav-movies.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private favMoviesService: FavMoviesService,
    @InjectRepository(FavMoviesEntity)
    private favMoviesRepository: Repository<FavMoviesEntity>,
  ) {}

  async createToken({
    id,
    login,
    password,
  }: UserEntity): Promise<SignInInfoDto> {
    const user: UserDto = { id, login, password };
    const secret = process.env.JWT_SECRET;
    return { accessToken: await jwt.sign(user, secret) };
  }

  async createUser(login: string, password: string): Promise<UserEntity> {
    return await this.userRepository.create({ login, password }).save();
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ login });
  }

  async signIn(login: string, password: string): Promise<SignInInfoDto> {
    let user = await this.getUserByLogin(login);

    if (!user) {
      user = await this.createUser(login, password);
    }
    return this.createToken(user);
  }

  async addFavMovies(
    id: number,
    { login }: UserEntity,
  ): Promise<FavMoviesEntity> {
    const user = await this.getUserByLogin(login);

    const favMoviesEntity: FavMoviesEntity = new FavMoviesEntity();
    favMoviesEntity.moviesId = id;
    favMoviesEntity.watched = false;
    favMoviesEntity.user = user;

    try {
      await favMoviesEntity.save();
      return favMoviesEntity;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async setFavMovieAsWatched(moviesId: number): Promise<FavMoviesEntity> {
    const movie = await this.favMoviesRepository.findOne({ moviesId });
    movie.watched = true;

    try {
      await movie.save();
      return movie;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async removeFavMovies(moviesId: number): Promise<FavMoviesEntity> {
    const movie = await this.favMoviesRepository.findOne({ moviesId });

    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    await this.favMoviesRepository.delete(movie.id);

    return movie;
  }
}
