import {gql} from '@apollo/client';
// Define mutation
const CREATE_PET = gql`
  # Create a new pet
  mutation CreatePet($petInput: PetInput!){
    createPet(input: $petInput){
        id
        name
        age
        species
        owner {
            id
        }
    }
  }
`;
export default CREATE_PET;