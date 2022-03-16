import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmCongfig, { TYPEORM_CONFIG } from './config/typeorm.config';
import { FavMoviesModule } from './fav-movies/fav-movies.module';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmCongfig],
    }),
    UsersModule,
    GenresModule,
    FavMoviesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [UsersModule, GenresModule, FavMoviesModule],
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(TYPEORM_CONFIG),
      }),
    }),
  ],
})
export class AppModule {}
