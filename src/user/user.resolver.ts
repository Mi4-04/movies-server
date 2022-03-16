import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => String)
  async signIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ) {
    let user = await this.userService.getUserByLogin(login);

    if (!user) {
      user = await this.userService.createUser(login, password);
    }
    return this.userService.createToken(user);
  }
}
