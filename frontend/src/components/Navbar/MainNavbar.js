import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './MainNavbar.css';

const MainNavbar = ({ username, currentPage, onPageChange, onLogout }) => {
    const displayName = username ? username.split('@')[0] : 'User';
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleNavigation = (path) => {
        navigate(path);
        onPageChange(path === '/' ? 'home' : path.slice(1));
        setIsDropdownOpen(false);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsDropdownOpen(false);
        if (onLogout) {
            onLogout();
        }
    };

    const handleViewProfile = () => {
        navigate('/profile');
        setIsDropdownOpen(false);
    };

    return (
        <nav className="main-navbar">
            <div className="nav-left">
                <div className="nav-logo" onClick={() => handleNavigation('/')}>
                    <Logo />
                </div>
            </div>
            <div className="nav-center">
                <button 
                    className={`nav-option ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/')}
                >
                    Home
                </button>
                <button 
                    className={`nav-option ${location.pathname === '/plants' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/plants')}
                >
                    Services
                </button>
                <button 
                    className={`nav-option ${location.pathname === '/contact' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/contact')}
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
                    tabIndex="0"
                >
                    🌿
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleViewProfile}>
                            <div className="dropdown-text">
                                <span className="dropdown-label">View Profile</span>
                                <span className="dropdown-description">Manage your account</span>
                            </div>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={handleLogout}>
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
