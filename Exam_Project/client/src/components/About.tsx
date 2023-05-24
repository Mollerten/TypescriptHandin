import React from 'react';
import '../styles/About.css';

const About = () => {
    return (
        <div className="about-container">
            <h2>About Catster</h2>
            <p>
                Welcome to Catster, the ultimate social media platform for cat lovers! Here are some interesting facts about Catster:
            </p>
            <ul>
                <li>
                    Catster is the largest online community dedicated to cats, with over 1 million registered users worldwide.
                </li>
                <li>
                    Our platform allows you to create profiles for your beloved feline friends and share their adorable pictures and stories.
                </li>
                <li>
                    Connect with fellow cat enthusiasts and discover a purrfect community where you can discuss cat-related topics, exchange tips, and make new friends.
                </li>
                <li>
                    Catster offers a unique feature called "Paw Points," where users can earn points by engaging with the community and redeem them for exclusive cat-themed merchandise.
                </li>
                <li>
                    Join our weekly photo contests and showcase the beauty, charm, and mischief of your cats. Who knows, your furry friend might become the next Catster celebrity!
                </li>
            </ul>
            <p className="spicy">
                Get ready to immerse yourself in the captivating world of cats and share your love for these majestic creatures on Catster!
            </p>
        </div>
    );
};

export default About;
