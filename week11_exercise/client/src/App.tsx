import { useState } from 'react'
import './App.css'
import {ApolloClient, ApolloProvider, InMemoryCache, useQuery} from "@apollo/client";
import PeopleView from "./components/peopleView";
import NavigationBar from "./components/navBar";
import CreatePersonForm from "./components/createPersonForm";
import { BrowserRouter as Router ,Route, Routes} from "react-router-dom";
import CreateAddressForm from "./components/createAddressForm";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),

});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<PeopleView/>} />
                    <Route path="/createperson" element={<CreatePersonForm/>} />
                    <Route path="/createaddress" element={<CreateAddressForm/>} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
};


export default App
