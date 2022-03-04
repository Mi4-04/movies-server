import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmCongfig } from './config/typeorm.config';
import { FavMoviesModule } from './fav-movies/fav-movies.module';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmCongfig),
    UsersModule,
    GenresModule,
    FavMoviesModule,
  ],
})
export class AppModule {}
