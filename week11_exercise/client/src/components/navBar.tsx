import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ isDarkMode, handleModeToggle }) => {
    return (
        <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
            <Link to="/" className="navbar-brand">
                My App
            </Link>
            <ul className="navbar-links">
                <li className="navbar-link-item">
                    <Link to="/createperson">Create Person</Link>
                </li>
                <li className="navbar-link-item">
                    <Link to="/createaddress">Create Address</Link>
                </li>
                <li className="navbar-link-item">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <button className="mode-toggle-button" onClick={handleModeToggle}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
};
export default NavBar;
