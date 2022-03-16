import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from './genres.entity';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([GenresEntity]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [GenresService, GenresResolver],
})
export class GenresModule {}
