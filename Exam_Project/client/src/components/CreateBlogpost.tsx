import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import CREATE_BLOGPOST from '../queries/CreateBlogpost';
import '../styles/CreateBlogpost.css'

type CreateBlogpostProps = {
    onCreateBlogpost: () => void;
};

const CreateBlogpost: React.FC<CreateBlogpostProps> = ({ onCreateBlogpost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [createBlogpost, { loading, error }] = useMutation(CREATE_BLOGPOST);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createBlogpost({
                variables: {
                    blogpostInput: {
                        title,
                        content,
                    },
                },
            });

            // Reset form fields
            setTitle('');
            setContent('');

            // Invoke callback to notify parent component
            onCreateBlogpost();
        } catch (error) {
            console.log('Error creating blog post:', error);
        }
    };

    return (
        <div className="create-blogpost-container">
            <div className="create-blogpost-form">
            <h2>Create Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} required />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" value={content} onChange={handleContentChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
        </div>
    );
};

export default CreateBlogpost;
