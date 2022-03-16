import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('fav-movies')
export class FavMoviesEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'movies_id' })
  moviesId: number;

  @Field()
  @Column({ name: 'watched' })
  watched: boolean;

  @Field()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => [UserEntity])
  @Column({ type: 'int', name: 'users_id', array: true, default: {} })
  @ManyToMany(() => UserEntity, (users) => users.favMovies)
  users: UserEntity[];
}
