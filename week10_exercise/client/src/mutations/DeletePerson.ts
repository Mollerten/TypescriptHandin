import { gql } from '@apollo/client';

const DELETE_PERSON = gql`
mutation DeletePerson($deletePersonId: ID!) {
  deletePerson(id: $deletePersonId) {
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
    imageUrl
  }
}
`;

export default DELETE_PERSON;