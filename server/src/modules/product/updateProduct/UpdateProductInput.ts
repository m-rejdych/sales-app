import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
class UpdateProductInput {
  @Field(() => ID)
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNumber()
  price: number;
}

export default UpdateProductInput;
