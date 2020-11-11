import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';

import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import Context from '../../../types/Context';
import CreateSaleInput from './CreateSaleInput';

@Resolver()
class CreateSale {
  @Authorized()
  @Mutation(() => Sale)
  async createSale(
    @Arg('data') { subject }: CreateSaleInput,
    @Ctx() ctx: Context,
  ): Promise<Sale> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sale = Sale.create({ subject });
    sale.user = user;
    await sale.save();
    return sale;
  }
}

export default CreateSale;
