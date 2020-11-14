import { gql } from '@apollo/client';

const getUser = gql`
  query GetUser($id: ID) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      fullName
    }
  }
`;

export default getUser;
