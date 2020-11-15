import { Resolver, Query, Arg, Authorized, Ctx, ID } from 'type-graphql';

import Product from '../../../entity/Product';
import User from '../../../entity/User';
import Sale from '../../../entity/Sale';
import Context from '../../../types/Context';

@Resolver()
class GetProducts {
  @Authorized()
  @Query(() => [Product])
  async getProducts(
    @Arg('saleId', () => ID) saleId: string,
    @Ctx() ctx: Context,
  ) {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sale = await Sale.findOne(saleId);
    if (!sale) throw new Error('Sale not found!');
    const products = await Product.find({
      where: { sale: saleId },
      relations: ['sale'],
    });
    return products;
  }
}

export default GetProducts;
