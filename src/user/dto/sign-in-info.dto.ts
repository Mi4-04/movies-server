import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInInfoDto {
  @Field()
  accessToken: string;
}
