import { Resolver, Query, Arg, Authorized, Ctx, ID } from 'type-graphql';

import User from '../../../entity/User';
import Sale from '../../../entity/Sale';
import Context from '../../../types/Context';

@Resolver()
class GetSale {
  @Authorized()
  @Query(() => Sale)
  async getSale(
    @Arg('saleId', () => ID) saleId: string,
    @Ctx() ctx: Context,
  ): Promise<Sale> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sale = await Sale.findOne(saleId, {
      loadRelationIds: { relations: ['products'] },
    });
    if (!sale) throw new Error('Sale not found!');
    return sale;
  }
}

export default GetSale;
