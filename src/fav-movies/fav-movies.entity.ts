import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('fav-movies')
export class FavMoviesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'movies_id' })
  moviesId: number;

  @Column({ name: 'watched' })
  watched: boolean;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @ManyToMany(() => UserEntity, (users) => users.favMovies)
  users: UserEntity[];
}
