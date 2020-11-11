import { ObjectType, Field } from 'type-graphql';

import User from '../../../entity/User';

@ObjectType()
class RegisterResponse {
  @Field()
  user: User;

  @Field()
  token: string;
}

export default RegisterResponse;
