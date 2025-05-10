import React, { useState, useEffect, useRef } from 'react';
import Logo from '../Logo/Logo';
import './MainNavbar.css';

const MainNavbar = ({ username, currentPage, onPageChange, onLogout }) => {
    const displayName = username ? username.split('@')[0] : 'User';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigation = (page) => {
        onPageChange(page);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Close dropdown
        setIsDropdownOpen(false);
        
        // Notify parent component
        if (onLogout) {
            onLogout();
        }
    };

    const handleViewProfile = () => {
        // Add view profile logic here
        console.log('Viewing profile...');
        setIsDropdownOpen(false);
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
            <div className="nav-right" ref={dropdownRef}>
                <span className="username">{displayName}</span>
                <div 
                    className="user-dp-emoji" 
                    title="User Menu" 
                    role="button" 
                    aria-label="User Menu"
                    onClick={toggleDropdown}
                >
                    🌿
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleViewProfile}>
                            <span className="dropdown-icon">🫂</span>
                            <div className="dropdown-text">
                                <span className="dropdown-label">View Profile</span>
                                <span className="dropdown-description">Manage your account</span>
                            </div>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={handleLogout}>
                            <span className="dropdown-icon">🏃</span>
                            <div className="dropdown-text">
                                <span className="dropdown-label">Log Out</span>
                                <span className="dropdown-description">Sign out of your account</span>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MainNavbar;
