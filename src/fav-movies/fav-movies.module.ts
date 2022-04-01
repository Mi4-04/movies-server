import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavMoviesEntity } from './fav-movies.entity';
import { FavMoviesService } from './fav-movies.service';
import { FavMoviesResolver } from './fav-movies.resolver';
import { HttpModule } from '@nestjs/axios';
import { UserEntity } from 'src/user/user.entity';
import { UsersModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavMoviesEntity, UserEntity]),
    HttpModule,
    UsersModule,
  ],
  providers: [FavMoviesService, FavMoviesResolver, UserService],
})
export class FavMoviesModule {}
