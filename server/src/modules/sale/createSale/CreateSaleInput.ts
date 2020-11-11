import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
class CreateSaleInput {
  @Field()
  @IsNotEmpty()
  subject: string;
}

export default CreateSaleInput;
