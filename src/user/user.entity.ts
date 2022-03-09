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

@Entity('users')
@Unique(['login'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'login', unique: true })
  login: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Column({ type: 'int', name: 'genres_id', array: true, default: {} })
  @ManyToMany(() => GenresEntity, (genres) => genres.users)
  genres: GenresEntity[];

  @Column({ type: 'int', name: 'movies_id', array: true, default: {} })
  @ManyToMany(() => FavMoviesEntity, (favMovies) => favMovies.users)
  favMovies: FavMoviesEntity[];
}
