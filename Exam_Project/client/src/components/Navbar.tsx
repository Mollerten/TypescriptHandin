import React from 'react';
import styles from '../styles/Navbar.module.css';
import logo from '../assets/CatsterLogo.png';



const NavigationBar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Catster Logo" className={styles.logoImage} />
            </div>
            <ul className={styles.navList}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/Login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
