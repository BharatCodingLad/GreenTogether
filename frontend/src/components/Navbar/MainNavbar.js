import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import './MainNavbar.css';

const MainNavbar = ({ username }) => {
    const [activeSection, setActiveSection] = useState('home');
    const displayName = username ? username.split('@')[0] : 'User';

    // Simple scroll function that works reliably
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Get the navbar element
        const navbar = document.querySelector('.main-navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;

        // Calculate the target position
        const targetPosition = section.offsetTop - navbarHeight;

        // Scroll to the target position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update active section
        setActiveSection(sectionId);
    };

    // Handle scroll events to update active section
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const navbar = document.querySelector('.main-navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;

            // If at the top, set home as active
            if (scrollPosition < 100) {
                setActiveSection('home');
                return;
            }

            // Check each section
            const sections = ['about', 'services', 'contact'];
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (!section) continue;

                const sectionTop = section.offsetTop - navbarHeight;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="main-navbar">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-center">
                <button 
                    className={`nav-option ${activeSection === 'home' ? 'active' : ''}`}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveSection('home');
                    }}
                >
                    Home
                </button>
                <button 
                    className={`nav-option ${activeSection === 'about' ? 'active' : ''}`}
                    onClick={() => scrollToSection('about')}
                >
                    About
                </button>
                <button 
                    className={`nav-option ${activeSection === 'services' ? 'active' : ''}`}
                    onClick={() => scrollToSection('services')}
                >
                    Services
                </button>
                <button 
                    className={`nav-option ${activeSection === 'contact' ? 'active' : ''}`}
                    onClick={() => scrollToSection('contact')}
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
