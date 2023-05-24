import { gql } from '@apollo/client';

    const GET_OWNER = gql`
query GetOwner($id: ID!) {
  owner(id:$id){
    id
    name
    age
    pets {
      id
      age
      name
      species
    } 
    blogposts {
      id
      title
      content
      comments {
        id
        owner {
          id
          name
        }
        content
      }
    }
  }
}
`
export default GET_OWNER