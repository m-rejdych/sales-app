import { Resolver, Query, Authorized, Args, Ctx } from 'type-graphql';

import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import GetAllSalesArgs from './GetAllSalesArgs';
import Context from '../../../types/Context';

@Resolver()
class GetAllSales {
  @Authorized()
  @Query(() => [Sale])
  async getAllSales(
    @Args() { take, skip }: GetAllSalesArgs,
    @Ctx() ctx: Context,
  ): Promise<Sale[]> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sales = await Sale.find({
      take,
      skip,
      relations: ['user', 'products'],
    });
    return sales;
  }
}

export default GetAllSales;
