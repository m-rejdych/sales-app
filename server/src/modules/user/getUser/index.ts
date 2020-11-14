import { Resolver, Query, Arg, ID, Authorized, Ctx } from 'type-graphql';

import User from '../../../entity/User';
import Context from '../../../types/Context';

@Resolver()
class GetUser {
  @Authorized()
  @Query(() => User)
  async getUser(
    @Arg('id', () => ID, { nullable: true }) id: string,
    @Ctx() ctx: Context,
  ): Promise<User> {
    if (!id) {
      const { userId } = ctx.user;
      const user = await User.findOne(userId);
      if (!user) throw new Error('User not found!');
      return user;
    }
    const user = await User.findOne(id, {
      relations: ['sales', 'sales.products'],
    });
    if (!user) throw new Error('User not found!');
    return user;
  }
}

export default GetUser;
