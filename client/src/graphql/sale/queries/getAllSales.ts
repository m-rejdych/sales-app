import { gql } from '@apollo/client';

export const getAllSales = gql`
  query GetAllSales($take: Int, $skip: Int) {
    getAllSales(take: $take, skip: $skip) {
      id
      subject
      user {
        id
        fullName
      }
      products {
        id
        name
        description
        price
      }
    }
  }
`;
