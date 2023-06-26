import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Blogpost, Pet, Owner, Comment } from '../types';
import GetOwner from '../queries/GetOwner';
import '../styles/OwnerViewer.css';
import BlogpostViewer from './BlogpostViewer';
import CreateBlogpost from './CreateBlogpost';
import BlogpostCard from "./BlogpostCard";

const OwnerViewer = () => {
    const { ownerId } = useParams<{ ownerId: string }>();

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
                <h3>Blogposts:</h3>
                {owner.blogposts.map((blogpost: Blogpost) => (
                    <BlogpostCard key={blogpost.id} blogpost={blogpost} />
                ))}
            </div>
        </div>
    );
};
export default OwnerViewer;
