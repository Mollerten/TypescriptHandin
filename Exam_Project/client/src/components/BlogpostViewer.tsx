import React from 'react';
import { useQuery } from '@apollo/client';
import { Blogpost } from "../types";
import GetAllBlogposts from "../queries/GetAllBlogposts";
import BlogpostCard from "./BlogpostCard";

const Blogposts = () => {
    const { loading, error, data } = useQuery(GetAllBlogposts);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {data?.blogposts.map((blogpost: Blogpost) => (
                <BlogpostCard key={blogpost.id} blogpost={blogpost} />
            ))}
        </div>
    );
};

export default Blogposts;

