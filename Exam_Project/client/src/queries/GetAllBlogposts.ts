import { gql } from '@apollo/client';
const GET_ALL_BLOGPOSTS = gql`
    query GetAllBlogposts {
      blogposts {
        id
        owner {
          id
          name
          age
        }
        title
        content
        comments {
          id
          owner {
            id
            name
            age
          }
        content
        }
      }
    }
    `
export default GET_ALL_BLOGPOSTS;