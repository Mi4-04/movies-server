import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('genres')
export class GenresEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'genre_id' })
  genreId: number;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Column({ type: 'int', name: 'users_id', array: true, default: {} })
  @ManyToMany(() => UserEntity, (users) => users.genres)
  users: UserEntity[];
}
