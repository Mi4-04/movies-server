import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmCongfig, { TYPEORM_CONFIG } from './config/typeorm.config';
import { FavMoviesModule } from './fav-movies/fav-movies.module';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmCongfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(TYPEORM_CONFIG),
      }),
    }),

    UsersModule,
    GenresModule,
    FavMoviesModule,
  ],
})
export class AppModule {}
