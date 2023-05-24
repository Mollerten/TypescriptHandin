import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import  CreateOwner  from '../queries/CreateOwner';
import '../styles/CreateOwner.css'

const SignupForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [createOwner, { loading, error }] = useMutation(CreateOwner);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await createOwner({
                variables: {
                    ownerInput: {
                        name,
                        age: parseInt(age),
                        email,
                        password,

                    },
                },
            });

            // Handle success
            console.log('New owner created:', data.createOwner);

            // Reset form
            setName('');
            setAge('');
            setEmail('');
            setPassword('');
        } catch (error: any) {

            // Log the entire error object to examine its details
            console.error('Error creating owner:', error);

            // Log the error message
            console.error('Error message:', error.message);

            // Log the GraphQL error details, if available
            if (error.graphQLErrors) {
                console.error('GraphQL Errors:', error.graphQLErrors);
            }

            // Log the network error, if available
            if (error.networkError) {
                console.error('Network Error:', error.networkError);
            }
        }


        // catch (error) {
        //     // Handle error
        //     console.error('Error creating owner:', error);
        // }
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        Sign Up
                    </button>

                    {error && <p>Error: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignupForm;