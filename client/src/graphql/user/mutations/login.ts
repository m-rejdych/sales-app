import { gql } from '@apollo/client';

const login = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
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

export default login;
