import { Resolver, Query, Arg, Authorized } from 'type-graphql';

import User from '../../../entity/User';

@Resolver()
class GetUser {
  @Authorized()
  @Query(() => User)
  async getUser(@Arg('id') id: string): Promise<User> {
    const user = await User.findOne(id);
    if (!user) throw new Error('User not found!');
    return user;
  }
}

export default GetUser;
