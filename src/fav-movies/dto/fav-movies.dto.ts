import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMoviesDto {
  @Field()
  adult: boolean;

  @Field({ name: 'backdropPath' })
  backdrop_path: string;

  @Field(() => [Number], { name: 'genreIds' })
  genre_ids: number[];

  @Field()
  id: number;

  @Field({ name: 'originalLanguage' })
  original_language: string;

  @Field({ name: 'originalTitle' })
  original_title: string;

  @Field()
  overview: string;

  @Field()
  popularity: number;

  @Field({ name: 'posterPath', nullable: true })
  poster_path: string;

  @Field({ name: 'releaseDate', nullable: true })
  release_date: string;

  @Field()
  title: string;

  @Field()
  video: boolean;

  @Field({ name: 'voteAverage' })
  vote_average: number;

  @Field({ name: 'voteCount' })
  vote_count: number;
}
