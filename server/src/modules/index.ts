import Register from './user/register';
import GetUser from './user/getUser';
import Login from './user/login';
import CreateSale from './sale/createSale';
import UpdateSale from './sale/updateSale';
import DeleteSale from './sale/deleteSale';
import AddProduct from './product/addProduct';
import UpdateProduct from './product/updateProduct';
import DeleteProduct from './product/deleteProduct';

const resolvers = [
  Register,
  GetUser,
  Login,
  CreateSale,
  UpdateSale,
  DeleteSale,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
] as const;

export default resolvers;
