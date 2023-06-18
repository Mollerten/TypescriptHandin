import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_ADDRESSES from '../queries/GetAllAddresses';
import CREATE_ADDRESS from '../mutations/AddAddressToPerson';
import { Person } from '../types';
type AddressesViewProps = {
    person: Person;
}
const AddressesView: React.FC<AddressesViewProps> = ({ person }) => {
    const { loading, error, data } = useQuery(GET_ADDRESSES);
    const [searchTerm, setSearchTerm] = useState('');
    const [addAddressToPerson] = useMutation(CREATE_ADDRESS);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredAddresses = data.addresses.filter((address) =>
        address.street.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddAddressToPerson = (personId, addressId) => {
        addAddressToPerson({
            variables: {
                personId,
                addressId,
            },
        })
            .then((result) => {
                // Handle success, if needed
            })
            .catch((error) => {
                // Handle error, if needed
            });
    };

    return (
        <div>
            <h1>Address List</h1>
            <input
                type="text"
                placeholder="Search by street..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredAddresses.map((address) => (
                    <li key={address.id}>
                        <p>Street: {address.street}</p>
                        <p>City: {address.city}</p>
                        <button onClick={() => handleAddAddressToPerson(person.id, address.id)}>
                            Add to Person
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddressesView;
