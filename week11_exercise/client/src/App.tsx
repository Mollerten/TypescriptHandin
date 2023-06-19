import { useState } from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import PeopleView from './components/peopleView';
import NavigationBar from './components/navBar';
import CreatePersonForm from './components/createPersonForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAddressForm from './components/createAddressForm';
import Login from './components/Login';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <ApolloProvider client={client}>
            <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
                <Router>
                    <NavigationBar
                        isLoggedIn={isLoggedIn}
                        isDarkMode={isDarkMode}
                        handleModeToggle={handleModeToggle}
                        handleLogout={handleLogout}
                    />
                    <div className="content">
                        <Routes>
                            <Route
                                path="/"
                                element={<PeopleView isLoggedIn={isLoggedIn} />}
                            />
                            <Route
                                path="/createperson"
                                element={<CreatePersonForm isLoggedIn={isLoggedIn} />}
                            />
                            <Route
                                path="/createaddress"
                                element={<CreateAddressForm isLoggedIn={isLoggedIn} />}
                            />
                            <Route
                                path="/login"
                                element={<Login onLogin={handleLogin} />}
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </ApolloProvider>
    );
};

export default App;
