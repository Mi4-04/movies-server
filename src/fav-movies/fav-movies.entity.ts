import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

@Entity('fav-movies')
export class FavMoviesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: number;

  @Column()
  watched: boolean;

  @CreateDateColumn()
  createDate: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
