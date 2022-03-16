import { FavMoviesEntity } from 'src/fav-movies/fav-movies.entity';
import { GenresEntity } from 'src/genres/genres.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
@Unique(['login'])
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'login', unique: true })
  login: string;

  @Field()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Field()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => [GenresEntity])
  @Column({ type: 'int', name: 'genres_id', array: true, default: {} })
  @ManyToMany(() => GenresEntity, (genres) => genres.users)
  genres: GenresEntity[];

  @Field(() => [FavMoviesEntity])
  @Column({ type: 'int', name: 'movies_id', array: true, default: {} })
  @ManyToMany(() => FavMoviesEntity, (favMovies) => favMovies.users)
  favMovies: FavMoviesEntity[];
}
