import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMoviesDto {
  @Field()
  adult: boolean;

  @Field()
  backdropPath: string;

  @Field(() => [Number])
  genreIds: number[];

  @Field()
  id: number;

  @Field()
  originalLanguage: string;

  @Field()
  originalTitle: string;

  @Field()
  overview: string;

  @Field()
  popularity: number;

  @Field()
  posterPath: string;

  @Field({ nullable: true })
  releaseDate: string;

  @Field()
  title: string;

  @Field()
  video: boolean;

  @Field()
  voteAverage: number;

  @Field()
  voteCount: number;
}
