import { gql } from '@apollo/client';

const register = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      user {
        id
        email
        firstName
        lastName
        fullName
      }
    }
  }
`;

export default register;
