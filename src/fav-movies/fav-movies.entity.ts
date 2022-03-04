import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('fav-movies')
export class FavMoviesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movies_id: number;

  @Column()
  watched: boolean;

  @CreateDateColumn()
  createDate: string;

  @ManyToOne((type) => UserEntity, (user) => user.favMovies)
  user: UserEntity;
}
