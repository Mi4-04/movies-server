import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HttpModule } from '@nestjs/axios';
import { FavMoviesService } from 'src/fav-movies/fav-movies.service';
import { FavMoviesModule } from 'src/fav-movies/fav-movies.module';
import { FavMoviesEntity } from 'src/fav-movies/fav-movies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FavMoviesEntity]),
    HttpModule,
    FavMoviesModule,
  ],
  providers: [UserService, UserResolver, FavMoviesService],
})
export class UsersModule {}
