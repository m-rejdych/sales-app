import Register from './user/register';
import GetUser from './user/getUser';
import Login from './user/login';
import CreateSale from './sale/createSale';

const resolvers = [Register, GetUser, Login, CreateSale] as const;

export default resolvers;
