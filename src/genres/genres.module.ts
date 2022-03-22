import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from './genres.entity';

import { HttpModule } from '@nestjs/axios';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([GenresEntity]),
    HttpModule
  ],
  providers: [GenresService, GenresResolver],
})
export class GenresModule {}
