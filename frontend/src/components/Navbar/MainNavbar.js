import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import './MainNavbar.css';

const MainNavbar = ({ username, currentPage, onPageChange }) => {
    const displayName = username ? username.split('@')[0] : 'User';
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId === 'hero') {
                        setActiveSection('home');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Observe the hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) observer.observe(heroSection);

        return () => {
            if (heroSection) observer.unobserve(heroSection);
        };
    }, []);

    const handleNavigation = (page) => {
        onPageChange(page);
    };

    return (
        <nav className="main-navbar">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-center">
                <button 
                    className={`nav-option ${currentPage === 'home' ? 'active' : ''}`}
                    onClick={() => handleNavigation('home')}
                >
                    Home
                </button>
                <button className="nav-option">
                    Services
                </button>
                <button 
                    className={`nav-option ${currentPage === 'contact' ? 'active' : ''}`}
                    onClick={() => handleNavigation('contact')}
                >
                    Contact
                </button>
            </div>
            <div className="nav-right">
                <span className="username">{displayName}</span>
                <div className="user-dp-emoji" title="User Emoji" role="img" aria-label="User Emoji">🌿</div>
            </div>
        </nav>
    );
};

export default MainNavbar;
