import { Resolver, Query, Arg, Authorized, ID } from 'type-graphql';

import User from '../../../entity/User';

@Resolver()
class GetUser {
  @Authorized()
  @Query(() => User)
  async getUser(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await User.findOne(id, { relations: ['sales'] });
    if (!user) throw new Error('User not found!');
    return user;
  }
}

export default GetUser;
