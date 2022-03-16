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
@Entity('genres')
export class GenresEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Number])
  @Column({ name: 'genre_id', type: 'int', array: true })
  genreId: number[];

  @Field()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Field(() => [UserEntity])
  @Column({ type: 'int', name: 'users_id', array: true, default: {} })
  @ManyToMany(() => UserEntity, (users) => users.genres)
  users: UserEntity[];
}
