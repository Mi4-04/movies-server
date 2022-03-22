import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMoviesDto {
  @Field()
  adult: boolean;
  @Field()
  backdrop_path: string;
  @Field(() => [Number])
  genre_ids: number[];
  @Field()
  id: number;
  @Field()
  original_language: string;
  @Field()
  original_title: string;
  @Field()
  overview: string;
  @Field()
  popularity: number;
  @Field()
  poster_path: string;
  @Field({ nullable: true })
  release_date: string;
  @Field()
  title: string;
  @Field()
  video: boolean;
  @Field()
  vote_average: number;
  @Field()
  vote_count: number;
}
