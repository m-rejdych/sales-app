import { Resolver, Ctx, Arg, Authorized, Mutation, ID } from 'type-graphql';

import Product from '../../../entity/Product';
import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import Context from '../../../types/Context';

@Resolver()
class DeleteProduct {
  @Authorized()
  @Mutation(() => ID)
  async deleteProduct(
    @Arg('productId', () => ID) productId: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const product = await Product.findOne(productId, {
      loadRelationIds: { relations: ['sale'] },
    });
    if (!product) throw new Error('Product not found!');
    const sale = await Sale.findOne(product.sale);
    if (!sale) throw new Error('Sale not found!');
    await product.remove();
    return productId;
  }
}

export default DeleteProduct;
