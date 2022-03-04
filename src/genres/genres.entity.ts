import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('genres')
export class GenresEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre_id: number;

  @CreateDateColumn()
  createDate: string;

  @ManyToOne((type) => UserEntity, (user) => user.genres)
  user: UserEntity;
}
