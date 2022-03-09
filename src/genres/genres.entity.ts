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

@Entity('genres')
export class GenresEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genreId: number;

  @CreateDateColumn()
  createDate: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
