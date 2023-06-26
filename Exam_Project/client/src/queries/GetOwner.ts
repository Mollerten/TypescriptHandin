import { gql } from '@apollo/client';

    const GET_OWNER = gql`
query getOwner($ownerId: ID) {
  owner(id: $ownerId) {
    id
    name
    age
    pets {
      id
      name
      species
      age
    }
    blogposts {
      id
      title
      content
      comments {
        id
        content
      }
    }
  }
}
`
export default GET_OWNER