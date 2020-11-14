import { ArgsType, Field, Int } from 'type-graphql';
import { IsInt } from 'class-validator';

@ArgsType()
class GetAllSalesArgs {
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  @IsInt()
  take: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsInt()
  skip: number;
}

export default GetAllSalesArgs;
