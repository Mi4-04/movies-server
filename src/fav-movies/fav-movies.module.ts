import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavMoviesEntity } from './fav-movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavMoviesEntity])],
  providers: [],
})
export class FavMoviesModule {}
