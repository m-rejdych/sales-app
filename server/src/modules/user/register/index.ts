import { Resolver, Mutation, Arg } from 'type-graphql';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import RegisterInput from './RegisterInput';
import RegisterResponse from './RegisterResponse';
import User from '../../../entity/User';
import { TOKEN_SECRET } from '../../../config';

@Resolver()
class Register {
  @Mutation(() => RegisterResponse)
  async register(
    @Arg('data') { email, password, firstName, lastName }: RegisterInput,
  ): Promise<RegisterResponse> {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists!');
    const hashedPassword = await hash(password, 12);
    const user = User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();
    const token = sign({ userId: user.id }, TOKEN_SECRET as string);

    return {
      user,
      token,
    };
  }
}

export default Register;
