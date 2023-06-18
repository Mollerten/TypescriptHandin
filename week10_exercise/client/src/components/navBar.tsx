import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to ="/" >Home</Link>
                </li>
                <li>
                    <Link to="/createperson">Create Person</Link>
                </li>
                <li>
                    <Link to="/createaddress">Create Address</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
