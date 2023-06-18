import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import CREATE_ADDRESS from '../mutations/CreateAddress';

const CreateAddressForm = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [createAddress, { loading, error }] = useMutation(CREATE_ADDRESS);

    const handleSubmit = (e) => {
        e.preventDefault();
        createAddress({ variables: { street, city } })
            .then((data) => {
                console.log('Address created:', data);
                // Handle successful address creation, such as displaying a success message or redirecting
            })
            .catch((error) => {
                console.error('Error creating address:', error);
                // Handle error, such as displaying an error message
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Create Address</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="street">Street:</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateAddressForm;
