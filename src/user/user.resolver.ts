import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignInInfoDto } from './dto/sign-in-info.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => SignInInfoDto)
  async signIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ) {
    return await this.userService.signIn(login, password);
  }
}
