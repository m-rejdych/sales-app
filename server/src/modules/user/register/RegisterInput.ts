import { InputType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

@InputType()
class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Matches(/^(?=.*\d).{4,8}$/)
  password: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;
}

export default RegisterInput;
