import React from 'react';
import './Copyright.css';

const Copyright = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="copyright-section">
            <div className="copyright-content">
                <div className="copyright-text">
                    <p>&copy; {currentYear} GreenTogether. All rights reserved.</p>
                </div>
                <div className="social-links">
                    <a href="https://twitter.com/greentogether" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://facebook.com/greentogether" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://instagram.com/greentogether" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com/company/greentogether" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <div className="contact-links">
                    <a href="mailto:contact@greentogether.com" className="contact-link">
                        <i className="fas fa-envelope"></i> contact@greentogether.com
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Copyright; 