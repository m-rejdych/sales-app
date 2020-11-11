import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
class UpdateSaleInput {
  @Field(() => ID)
  @IsNotEmpty()
  saleId: string;

  @Field()
  @IsNotEmpty()
  subject: string;
}

export default UpdateSaleInput;
