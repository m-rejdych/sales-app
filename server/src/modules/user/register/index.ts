import { Resolver, Query } from 'type-graphql';

@Resolver()
class Register {
  @Query()
  register(): string {
    return 'Hello world!';
  }
}

export default Register;
