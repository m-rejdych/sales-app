import Register from './user/register';
import GetUser from './user/getUser';
import Login from './user/login';

const resolvers = [Register, GetUser, Login] as const;

export default resolvers;
