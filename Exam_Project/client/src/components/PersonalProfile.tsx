import React from 'react';
import { useQuery } from '@apollo/client';
import { Blogpost, Pet, Owner, Comment } from '../types';
import GetOwner from '../queries/GetOwner';
import '../styles/OwnerViewer.css';
import CreateBlogpost from './CreateBlogpost';
import BlogpostCard from "./BlogpostCard";
import jwt_decode from "jwt-decode";
import CreatePet from './CreatePet';

const token = localStorage.getItem('token');
const PersonalProfile = () => {

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

    const { loading, error, data } = useQuery(GetOwner, {
        variables: { ownerId }, // Pass the ownerId as a variable named 'id'
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const owner = data.owner;

    const handleCreateBlogpost = () => {
        // Perform any necessary actions after creating a blog post
        // For example, refetch owner data to update the displayed blog posts
        // You can use useQuery or any other method to refetch the data
    };

    const handleCreatePet = () => {
        // Perform any necessary actions after creating a pet
        // For example, refetch owner data to update the displayed pets
        // You can use useQuery or any other method to refetch the data
    };


    return (
        <div className="owner-container">
            <div className="owner-content">
                <div className="owner-info">
                    <img src={owner.imageUrl} alt={owner.name} />
                    <h2>{owner.name}</h2>
                    <p>Age: {owner.age}</p>
                </div>
                <h3>Pets:</h3>
                <ul>
                    {owner.pets.map((pet: Pet) => (
                        <li key={pet.id}>
                            <div className="pet-info">
                                <img src={pet.imageUrl} alt={pet.name} />
                                <p>{pet.name} - {pet.species} (Age: {pet.age})</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <CreatePet onCreatePet={handleCreatePet} />
                <CreateBlogpost onCreateBlogpost={handleCreateBlogpost} />
                <h3>Blogposts:</h3>
                {owner.blogposts.map((blogpost: Blogpost) => (
                    <BlogpostCard key={blogpost.id} blogpost={blogpost} />
                ))}
            </div>
        </div>
    );
};
export default PersonalProfile;
