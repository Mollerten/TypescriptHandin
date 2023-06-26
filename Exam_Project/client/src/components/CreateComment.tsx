import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import jwt_decode from "jwt-decode";
import CREATE_COMMENT from '../queries/CreateComment';
import '../styles/CreateComment.css';

type CreateCommentProps = {
    onCreateComment: () => void;
    blogpostId: string;
};

const CreateComment: React.FC<CreateCommentProps> = ({ onCreateComment, blogpostId }) => {
    const [content, setContent] = useState('');
    const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);
    const token = localStorage.getItem('token');
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createComment({
                variables: {
                    commentInput: {
                        content,
                        ownerId: ownerId,
                        blogpostId: blogpostId,
                    },
                },
            });

            setContent('');

            // Invoke callback to notify parent component
            onCreateComment();
        } catch (error) {
            console.log('Error creating comment:', error);
        }
    };

    return (
        <div className="create-comment-container">
            <div className="create-comment-form">
                <h2>Create Comment</h2>
                <form onSubmit={handleSubmit}>
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

export default CreateComment;
