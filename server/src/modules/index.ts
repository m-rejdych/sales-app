import Register from './user/register';
import GetUser from './user/getUser';
import Login from './user/login';
import CreateSale from './sale/createSale';
import UpdateSale from './sale/updateSale';
import DeleteSale from './sale/deleteSale';
import GetSale from './sale/getSale';
import GetAllSales from './sale/getAllSales';
import AddProduct from './product/addProduct';
import UpdateProduct from './product/updateProduct';
import DeleteProduct from './product/deleteProduct';
import GetProduct from './product/getProduct';

const resolvers = [
  Register,
  GetUser,
  Login,
  CreateSale,
  UpdateSale,
  DeleteSale,
  GetSale,
  GetAllSales,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  GetProduct,
] as const;

export default resolvers;
