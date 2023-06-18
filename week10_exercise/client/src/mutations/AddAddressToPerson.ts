import { gql } from '@apollo/client';

const CREATE_ADDRESS = gql`
mutation AddPersonToAddress($personId: ID!, $addressId: ID!) {
  addAddressToPerson(personId: $personId, addressId: $addressId) {
    id
    name
    email
    age
    address {
      city
      id
      street
    }
    phone
  }
}
`;

export default CREATE_ADDRESS;