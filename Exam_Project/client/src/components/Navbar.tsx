import React from 'react';
import styles from '../styles/Navbar.module.css';
import logo from '../assets/CatsterLogo.png';

const NavigationBar: React.FC<{ isLoggedIn: boolean; handleLogout: () => void }> = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Catster Logo" className={styles.logoImage} />
            </div>
            <ul className={styles.navList}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                {isLoggedIn? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                        <a href="/account">Account</a>
                    </li>

                ): (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavigationBar;
