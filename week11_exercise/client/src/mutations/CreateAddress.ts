import { gql } from '@apollo/client';

const CREATE_ADDRESS = gql`
 mutation createAddress($street: String!, $city: String!) {
  createAddress(street: $street, city: $city) {
    id
    street
    city
  }
}
`;

export default CREATE_ADDRESS;