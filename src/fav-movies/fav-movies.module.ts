import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavMoviesEntity } from './fav-movies.entity';
import { FavMoviesService } from './fav-movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavMoviesEntity])],
  providers: [FavMoviesService],
})
export class FavMoviesModule {}
