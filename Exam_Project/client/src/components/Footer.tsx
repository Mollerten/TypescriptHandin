import React from 'react';
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
        <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Catster™. All rights reserved.</p>
    <p>123 Cat Street, Meowville, Catland</p>
    <p>Email: info@catster.com</p>
    </div>
    </div>
    </footer>
);
};

export default Footer;
