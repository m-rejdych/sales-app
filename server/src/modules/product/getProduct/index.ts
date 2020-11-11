import { Resolver, Query, Ctx, Authorized, ID, Arg } from 'type-graphql';

import Product from '../../../entity/Product';
import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import Context from '../../../types/Context';

@Resolver()
class GetProduct {
  @Authorized()
  @Query(() => Product)
  async getProduct(
    @Arg('productId', () => ID) productId: string,
    @Ctx() ctx: Context,
  ): Promise<Product> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const product = await Product.findOne(productId, {
      loadRelationIds: { relations: ['sale'] },
    });
    if (!product) throw new Error('Product not found!');
    const sale = await Sale.findOne(product.sale);
    if (!sale) throw new Error('Sale not found!');
    return product;
  }
}

export default GetProduct;
