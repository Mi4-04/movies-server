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

  @ManyToMany(() => GenresEntity)
  genres: GenresEntity[];

  @ManyToMany(() => FavMoviesEntity)
  favMovies: FavMoviesEntity[];
}
