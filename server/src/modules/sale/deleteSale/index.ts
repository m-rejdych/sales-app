import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  Authorized,
  ForbiddenError,
} from 'type-graphql';

import Sale from '../../../entity/Sale';
import User from '../../../entity/User';
import Context from '../../../types/Context';

@Resolver()
class DeleteSale {
  @Authorized()
  @Mutation(() => String)
  async deleteSale(
    @Arg('saleId') saleId: string,
    @Ctx() ctx: Context,
  ): Promise<string> {
    const { userId } = ctx.user;
    const user = await User.findOne(userId);
    if (!user) throw new Error('User not found!');
    const sale = await Sale.findOne(saleId, {
      loadRelationIds: { relations: ['user'] },
    });
    if (!sale) throw new Error('Sale not found!');
    if ((sale.user as unknown) !== userId) throw new ForbiddenError();
    await sale.remove();
    return 'Sale successfully deleted!';
  }
}

export default DeleteSale;