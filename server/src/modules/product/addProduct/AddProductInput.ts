import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
class AddProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNumber()
  price: number;

  @Field(() => ID)
  @IsNotEmpty()
  saleId: string;
}

export default AddProductInput;
