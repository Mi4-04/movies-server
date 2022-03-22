import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavMoviesEntity } from './fav-movies.entity';
import { FavMoviesService } from './fav-movies.service';
import { FavMoviesResolver } from './fav-movies.resolver';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [TypeOrmModule.forFeature([FavMoviesEntity]), HttpModule],
  providers: [FavMoviesService, FavMoviesResolver],
  exports: [FavMoviesModule, FavMoviesService],
})
export class FavMoviesModule {}
