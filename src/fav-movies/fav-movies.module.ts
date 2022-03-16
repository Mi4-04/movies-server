import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FavMoviesEntity } from './fav-movies.entity';
import { FavMoviesService } from './fav-movies.service';
import { FavMoviesResolver } from './fav-movies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FavMoviesEntity])],
  providers: [FavMoviesService, FavMoviesResolver],
})
export class FavMoviesModule {}
