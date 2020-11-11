import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';

import User from '../../../entity/User';
import Sale from '../../../entity/Sale';
import Product from '../../../entity/Product';
import UpdateProductInput from './UpdateProductInput';
import Context from '../../../types/Context';

@Resolver()
class UpdateProduct {
  @Authorized()
  @Mutation(() => Product)
  async updateProduct(
    @Arg('data') { name, description, price, productId }: UpdateProductInput,
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
    product.name = name;
    product.description = description;
    product.price = price;
    await product.save();
    return product;
  }
}

export default UpdateProduct;
