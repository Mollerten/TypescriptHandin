import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BlogpostViewer from './components/BlogpostViewer';
import Navbar from './components/Navbar';
import OwnerViewer from './components/OwnerViewer';
import Footer from './components/Footer';
import CreateOwner from "./components/CreateOwner";
import Login from "./components/Login";
import About from "./components/About";
import jwt_decode from "jwt-decode";
import PersonalProfile from "./components/PersonalProfile";


export const LoginStatusContext = React.createContext(false);


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state to track login status

    useEffect(() => {
        // Check if a valid token exists in the local storage
        const token = localStorage.getItem('token');
        if (token) {

            try {
                // Verify the token to check if it's valid
                const decodedToken: {exp: number} = jwt_decode(token)
                if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
                    // Token is valid and not expired
                    setIsLoggedIn(true);
                } else {
                    console.log ("Token expired")
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log("Invalid token")
                setIsLoggedIn(false);
            }
        } else {
            console.log("No token found")
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <ApolloProvider client={client}>
            <Router>
                <LoginStatusContext.Provider value={isLoggedIn}>
                    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                    <Routes>
                        <Route path="/" element={<BlogpostViewer />} />
                        <Route path="/profile/:ownerId" element={<OwnerViewer />} />
                        <Route path="/signup" element={<CreateOwner />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/account" element={<PersonalProfile />} />

                    </Routes>
                </LoginStatusContext.Provider>
                <Footer />
            </Router>
        </ApolloProvider>
    );
};

export default App;
