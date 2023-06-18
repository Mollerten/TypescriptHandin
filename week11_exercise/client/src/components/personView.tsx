import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Person } from '../types';
import AddressesView from './addressView';
import DELETE_PERSON from '../mutations/DeletePerson';

type PersonViewProps = {
    person: Person;
};

const PersonView: React.FC<PersonViewProps> = ({ person }) => {
    const { name, imageUrl, email, age, phone, address } = person;
    const [showAddresses, setShowAddresses] = useState(false);
    const [deletePerson] = useMutation(DELETE_PERSON);

    const street = address?.street || 'UNKNOWN ADDRESS';
    const city = address?.city || 'UNKNOWN CITY';
    const hasNoAddress = !address?.street && !address?.city;

    const handleShowAddresses = () => {
        setShowAddresses(true);
    };

    const handleDeletePerson = () => {
        deletePerson({ variables: { deletePersonId: person.id } })
            .then(() => {
                setSelectedPerson(null);
            })
            .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error('Error deleting person:', error);
            });
    };

    return (
        <div>
            <img src={imageUrl} alt={name} />
            <p>Email: {email}</p>
            <p>Age: {age}</p>
            <p>Phone: {phone}</p>
            <p>
                Address: {street}, {city}
            </p>
            {hasNoAddress && (
                <button onClick={handleShowAddresses}>Add Existing Address</button>
            )}
            <button onClick={handleDeletePerson}>Delete Person</button>
            {showAddresses && <AddressesView person={person} />}
        </div>
    );
};

export default PersonView;
