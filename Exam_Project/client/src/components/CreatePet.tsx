import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import CREATE_PET from '../queries/CreatePet';
import '../styles/CreatePet.css';
import jwt_decode from "jwt-decode";

const token = localStorage.getItem('token');

type CreatePetProps = {
    onCreatePet: () => void;
};




const CreatePet: React.FC<CreatePetProps> = ({ onCreatePet }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [species, setSpecies] = useState('');
    const [createPet, { loading, error }] = useMutation(CREATE_PET);

    const decodeToken = () => {
        try {
            // Decode the JWT token
            // @ts-ignore
            const decodedToken = jwt_decode(token);
            // @ts-ignore
            const ownerId = decodedToken?.ownerId;
            return ownerId;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    };

    const ownerId = decodeToken();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(parseInt(e.target.value));
    };

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpecies(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createPet({
                variables: {
                    petInput: {
                        name,
                        age,
                        species,
                        ownerId,
                    },
                },
            });

            setName('');
            setAge(0);
            setSpecies('');

            // Invoke callback to notify parent component
            onCreatePet();
        } catch (error) {
            console.log('Error creating pet:', error);
        }
    };

    return (
        <div className="create-pet-container">
            <div className="create-pet-form">
                <h2>Create Pet</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={handleNameChange} required />
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" value={age} onChange={handleAgeChange} required />
                    </div>
                    <div>
                        <label htmlFor="species">Species:</label>
                        <input type="text" id="species" value={species} onChange={handleSpeciesChange} required />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePet;