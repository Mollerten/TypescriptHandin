import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import CREATE_COMMENT from '../queries/CreateComment';
import '../styles/CreateComment.css';


type CreateCommentProps = {
    onCreateComment: () => void;
};

const CreateComment: React.FC<CreateCommentProps> = ({ onCreateComment }) => {
    const [content, setContent] = useState('');
    const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createComment({
                variables: {
                    commentInput: {
                        content,
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
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            required
                        />
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
