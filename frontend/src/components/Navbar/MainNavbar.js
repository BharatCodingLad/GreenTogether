import React from 'react';
import Logo from '../Logo/Logo';
import './MainNavbar.css';

const MainNavbar = ({ username }) => {
    // Extract username before '@'
    const displayName = username ? username.split('@')[0] : 'User';

    return (
        <nav className="main-navbar">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-center">
                <button className="nav-option">Home</button>
                <button className="nav-option">About</button>
                <button className="nav-option">Services</button>
                <button className="nav-option">Contact</button>
            </div>
            <div className="nav-right">
                <span className="username">{displayName}</span>
                <div className="user-dp-emoji" title="User Emoji" role="img" aria-label="User Emoji">🌿</div>
            </div>
        </nav>
    );
};

export default MainNavbar;
