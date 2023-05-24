import {gql} from '@apollo/client';
// Define mutation
const CREATE_BLOGPOST = gql`
  # Create a new blogpost
  mutation CreateBlogpost($blogpostInput: BlogpostInput!){
    createBlogpost(input: $blogpostInput){
        id
        owner {
            id
        }
        title
        content
    }
  }
`;
export default CREATE_BLOGPOST;