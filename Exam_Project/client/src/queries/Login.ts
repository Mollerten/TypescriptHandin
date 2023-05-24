import { gql } from '@apollo/client';

// Define the login mutation
const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      token
    }
  }
`;

export default LOGIN;