import React from 'react';
import Logo from '../Logo/Logo';
import './Navbar.css';

const Navbar = ({ isUser, setIsUser }) => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Logo />
            </div>
            <div className="nav-links">
                <button 
                    className={`login-btn ${isUser ? 'active' : ''}`}
                    onClick={() => setIsUser(true)}
                >
                    User Login
                </button>
                <button 
                    className={`login-btn vendor ${!isUser ? 'active' : ''}`}
                    onClick={() => setIsUser(false)}
                >
                    Vendor Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;