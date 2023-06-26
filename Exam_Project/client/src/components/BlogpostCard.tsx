import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Blogpost, Comment } from '../types';
import '../styles/BlogpostCard.css';
import CreateComment from './CreateComment';
import { LoginStatusContext } from '../App';

type BlogpostCardProps = {
    blogpost: Blogpost;
};

const BlogpostCard: React.FC<BlogpostCardProps> = ({ blogpost }) => {
    const [showComments, setShowComments] = useState(false);
    const [showCreateComment, setShowCreateComment] = useState(false);
    const isLoggedIn = useContext(LoginStatusContext);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const toggleCreateComment = () => {
        setShowCreateComment(!showCreateComment);
    };

    return (
        <div className="blogpost-card">
            {blogpost.owner && (
                <Link to={`/profile/${blogpost.owner.id}`}>{blogpost.owner.name}</Link>
            )}
            <h2>{blogpost.title}</h2>
            <p>{blogpost.content}</p>
            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            {showComments && (
                <>
                    <ul>
                        {blogpost.comments.map((comment: Comment) => (
                            <li key={comment.id} className="comment">
                                <div>
                                    {comment.owner && (
                                        <Link to={`/profile/${comment.owner.id}`}>
                                            {comment.owner.name}
                                        </Link>
                                    )}
                                </div>
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                    {isLoggedIn && (
                        <button onClick={toggleCreateComment}>
                            {showCreateComment ? 'Cancel' : 'Add Comment'}
                        </button>
                    )}
                    {showCreateComment && <CreateComment onCreateComment={() => {}}  blogpostId={blogpost.id}/>}
                </>
            )}
        </div>
    );
};

export default BlogpostCard;