import { Resolver, Mutation, Ctx, Authorized, Arg } from 'type-graphql';

import Product from '../../../entity/Product';
import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import Context from '../../../types/Context';
import AddProductInput from './AddProductInput';

@Resolver()
class AddProduct {
  @Authorized()
  @Mutation(() => Product)
  async addProduct(
    @Arg('data') { name, description, price, saleId }: AddProductInput,
    @Ctx() ctx: Context,
  ): Promise<Product> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sale = await Sale.findOne(saleId);
    if (!sale) throw new Error('Sale not found!');
    const product = Product.create({ name, description, price, sale });
    await product.save();
    return product;
  }
}

export default AddProduct;
