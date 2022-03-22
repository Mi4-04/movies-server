import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID,  ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('fav-movies')
export class FavMoviesEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'movies_id', nullable: true })
  moviesId: number;

  @Field()
  @Column({ name: 'watched', default: false })
  watched: boolean;

  @Field()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.favMovies)
  user: UserEntity;
}
