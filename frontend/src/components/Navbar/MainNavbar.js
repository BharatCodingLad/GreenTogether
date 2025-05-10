import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import './MainNavbar.css';

const MainNavbar = ({ username }) => {
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
                    switch(sectionId) {
                        case 'hero':
                            setActiveSection('home');
                            break;
                        case 'about':
                            setActiveSection('about');
                            break;
                        default:
                            break;
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Observe the sections
        const heroSection = document.getElementById('hero');
        const aboutSection = document.getElementById('about');

        if (heroSection) observer.observe(heroSection);
        if (aboutSection) observer.observe(aboutSection);

        return () => {
            if (heroSection) observer.unobserve(heroSection);
            if (aboutSection) observer.unobserve(aboutSection);
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="main-navbar">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-center">
                <button 
                    className={`nav-option ${activeSection === 'home' ? 'active' : ''}`}
                    onClick={() => scrollToSection('hero')}
                >
                    Home
                </button>
                <button 
                    className={`nav-option ${activeSection === 'about' ? 'active' : ''}`}
                    onClick={() => scrollToSection('about')}
                >
                    About
                </button>
                <button className="nav-option">
                    Services
                </button>
                <button className="nav-option">
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
