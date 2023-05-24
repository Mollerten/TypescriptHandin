import {gql} from '@apollo/client';
// Define mutation
const CREATE_OWNER = gql`
  # Create a new owner
  mutation CreateOwner($ownerInput: OwnerInput!){
    createOwner(input: $ownerInput){
        name
        age
        email
        password
    }
  }
`;
export default CREATE_OWNER;