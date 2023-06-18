import { gql } from '@apollo/client';


const GET_PEOPLE = gql`
  query GetPeople {
    people {
      id
      name
      email
      age
      address {
        id
        street
        city
      }
      phone
      imageUrl
    }
  }
`;


export default GET_PEOPLE;