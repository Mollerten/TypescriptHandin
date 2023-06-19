import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if (username === 'dummyuser' && password === 'dummypassword') {
            onLogin();
            setLoginError('');
            navigate('/');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
                {loginError && <p className="login-error">{loginError}</p>}
            </div>
        </div>
    );
};

export default Login;
