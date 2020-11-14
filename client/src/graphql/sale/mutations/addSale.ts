import { gql } from '@apollo/client';

const addSale = gql`
  mutation CreateSale($data: CreateSaleInput!) {
    createSale(data: $data) {
      id
      subject
      user {
        id
        fullName
      }
    }
  }
`;

export default addSale;
