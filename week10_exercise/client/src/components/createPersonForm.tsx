import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import CREATE_PERSON from '../mutations/CreatePerson';

const CreatePersonForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [createPerson, { loading, error }] = useMutation(CREATE_PERSON);

    const handleSubmit = (e) => {
        e.preventDefault();

        createPerson({
            variables: {
                name,
                age,
                email,
                phone,
            },
        })
            .then((response) => {
                console.log('Person created:', response.data.createPerson);
                // Handle any further actions after successful creation
            })
            .catch((error) => {
                console.error('Error creating person:', error);
                // Handle error cases
            });

        // Reset form fields
        setName('');
        setAge(0);
        setEmail('');
        setPhone('');
    };

    return (
        <div>
            <h2>Create Person</h2>
            {error && <div>Error: {error.message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" value={age} onChange={(e) => setAge(parseInt(e.target.value))} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>Create</button>
            </form>
        </div>
    );
};

export default CreatePersonForm;
