import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_PEOPLE from '../queries/GetAllPeople';
import { Person } from '../types';
import { Address } from '../types';
import PersonView from './PersonView';

const PeopleView = () => {
    const { loading, error, data } = useQuery(GET_PEOPLE);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handlePersonClick = (person: Person) => {
        setSelectedPerson((prevSelectedPerson) =>
            prevSelectedPerson === person ? null : person
        );
    };

    return (
        <div>
            <h1>List of People</h1>
            <ul>
                {data.people.map((person: Person) => (
                    <li key={person.id}>
                        <h3>{person.name}</h3>
                        {selectedPerson === person && <PersonView person={person} />}
                        <button onClick={() => handlePersonClick(person)}>
                            {selectedPerson === person ? 'Hide Details' : 'View Details'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PeopleView;
