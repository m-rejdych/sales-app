import Register from './user/register';
import GetUser from './user/getUser';
import Login from './user/login';
import CreateSale from './sale/createSale';
import UpdateSale from './sale/updateSale';
import DeleteSale from './sale/deleteSale';

const resolvers = [
  Register,
  GetUser,
  Login,
  CreateSale,
  UpdateSale,
  DeleteSale,
] as const;

export default resolvers;
