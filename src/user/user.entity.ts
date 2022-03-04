import { FavMoviesEntity } from 'src/fav-movies/fav-movies.entity';
import { GenresEntity } from 'src/genres/genres.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique(['login'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createDate: string;

  @OneToMany((type) => GenresEntity, (genre) => genre.user)
  genres: GenresEntity[];

  @OneToMany((type) => FavMoviesEntity, (favMovies) => favMovies.user)
  favMovies: FavMoviesEntity[];
}
