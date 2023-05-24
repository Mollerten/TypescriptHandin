import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BlogpostViewer from './components/BlogpostViewer';
import Navbar from './components/Navbar';
import OwnerViewer from './components/OwnerViewer';
import Footer from './components/Footer';
import CreateOwner from "./components/CreateOwner";
import Login from "./components/Login";
import About from "./components/About";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<BlogpostViewer />} />
                    <Route path="/profile/:ownerId" element={<OwnerViewer />} />
                    <Route path="/signup" element={<CreateOwner/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/about" element={<About/>} />

                </Routes>
                <Footer />
            </Router>
        </ApolloProvider>
    );
};

export default App;
