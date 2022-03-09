import { FavMoviesEntity } from 'src/fav-movies/fav-movies.entity';
import { GenresEntity } from 'src/genres/genres.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable,
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
  createDate: Date;

  @ManyToMany(() => GenresEntity)
  @JoinTable()
  genres: GenresEntity[];

  @ManyToMany(() => FavMoviesEntity)
  @JoinTable()
  favMovies: FavMoviesEntity[];
}
