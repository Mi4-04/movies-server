import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from './genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenresEntity])],
})
export class GenresModule {}
