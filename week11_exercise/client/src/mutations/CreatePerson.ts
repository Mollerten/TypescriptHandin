import { gql } from '@apollo/client';

const CREATE_PERSON = gql`
  mutation CreatePerson($name: String!, $age: Int!, $email: String!, $phone: String!) {
    createPerson(name: $name, age: $age, email: $email, phone: $phone) {
      id
      name
      email
      age
      phone
    }
  }
`;

export default CREATE_PERSON;