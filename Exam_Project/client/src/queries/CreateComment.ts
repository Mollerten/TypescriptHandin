import {gql} from '@apollo/client';
// Define mutation
const CREATE_COMMENT = gql`
  # Create a new comment
  mutation CreateComment($commentInput: CommentInput!){
    createComment(input: $commentInput){
        id
        owner {
            id
        }
        blogpost {
            id
        }
        content
    }
  }
`;
export default CREATE_COMMENT;