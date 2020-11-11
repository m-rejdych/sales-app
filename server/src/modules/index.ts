import Register from './user/register';
import GetUser from './user/getUser';

const resolvers = [Register, GetUser] as const;

export default resolvers;
