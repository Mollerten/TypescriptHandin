import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Blogpost, Pet, Owner, Comment } from '../types';
import GetOwner from '../queries/GetOwner';
import '../styles/OwnerViewer.css';
import BlogpostViewer from './BlogpostViewer';
import CreateBlogpost from './CreateBlogpost';

const OwnerViewer = () => {
    const { ownerId } = useParams<{ ownerId: string }>(); // Extract the ownerId from the URL parameter

    const { loading, error, data } = useQuery(GetOwner, {
        variables: { id: ownerId }, // Pass the ownerId as a variable named 'id'
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

    return (
        <div className="owner-container">
            <div className="owner-content">
                <h2>{owner.name}</h2>
                <p>Age: {owner.age}</p>
                <h3>Pets:</h3>
                <ul>
                    {owner.pets.map((pet: Pet) => (
                        <li key={pet.id}>
                            {pet.name} - {pet.species} (Age: {pet.age})
                        </li>
                    ))}
                </ul>
                <CreateBlogpost onCreateBlogpost={handleCreateBlogpost} />
            </div>
        </div>
    );
};

export default OwnerViewer;
