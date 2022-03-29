import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMoviesDto {
  @Field()
  adult: boolean;

  @Field()
  backdropPath: string;

  @Field(() => [Number], { name: 'genre_ids' })
  genre_ids: number[];

  @Field()
  id: number;

  @Field({ name: 'original_language' })
  originalLanguage: string;

  @Field({ name: 'original_title' })
  originalTitle: string;

  @Field()
  overview: string;

  @Field()
  popularity: number;

  @Field({ name: 'poster_path', nullable: true })
  posterPath: string;

  @Field({ name: 'release_date', nullable: true })
  releaseDate: string;

  @Field()
  title: string;

  @Field()
  video: boolean;

  @Field({ name: 'vote_average' })
  voteAverage: number;

  @Field({ name: 'vote_count' })
  voteCount: number;
}
