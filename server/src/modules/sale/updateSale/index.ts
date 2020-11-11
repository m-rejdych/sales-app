import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Authorized,
  ForbiddenError,
} from 'type-graphql';

import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import Context from '../../../types/Context';
import UpdateSaleInput from './UpdateSaleInput';

@Resolver()
class UpdateSale {
  @Authorized()
  @Mutation(() => Sale)
  async updateSale(
    @Arg('data') { saleId, subject }: UpdateSaleInput,
    @Ctx() ctx: Context,
  ): Promise<Sale> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sale = await Sale.findOne(saleId, {
      loadRelationIds: { relations: ['user'] },
    });
    if (!sale) throw new Error('Sale not found!');
    if ((sale.user as unknown) !== userId) throw new ForbiddenError();
    sale.subject = subject;
    await sale.save();
    return sale;
  }
}

export default UpdateSale;
