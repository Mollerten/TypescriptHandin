import { gql } from '@apollo/client';

const GET_ADDRESSES = gql`
 query GetAllAddresses {
    addresses {
        id
        street
        city
    }
}

`;
export default GET_ADDRESSES;