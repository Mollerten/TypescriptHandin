import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import LOGIN from '../queries/Login'; // Import the Login mutation
import '../styles/Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Define the login mutation function
    const [login, { loading, error, data }] = useMutation(LOGIN);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {
                    input: {
                        email,
                        password,
                    },
                },
            });

            if (data.login.success) {
                // Login successful
                const token = data.login.token;
                localStorage.setItem('token', token);
                setPassword('');
            } else {
                console.log('Login failed');
                const errorMessage = 'Invalid email or password';
                setErrorMessage(errorMessage);
                // Login failed
                // Handle error messages or display appropriate feedback to the user
            }
        } catch (error) {
            console.error('Error during login:', error);
            const errorMessage = 'An error occurred during login';
            setErrorMessage(errorMessage);
            setPassword('');
        }
    };



    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {errorMessage && <p>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
