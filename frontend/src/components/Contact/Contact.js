import React, { useState, useEffect, useMemo } from 'react';
import './Contact.css';

const TypingText = () => {
    const messages = useMemo(() => [
        "Have questions about our eco-friendly services?",
        "Want to learn more about sustainability?",
        "Need help with your green initiatives?",
        "Ready to make a difference?",
        "Let's work together for a greener future!"
    ], []);

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const currentMessage = messages[currentMessageIndex];
        
        if (!isDeleting && displayText === currentMessage) {
            // Pause before starting to delete
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
            setTypingSpeed(100);
            return;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setDisplayText(currentMessage.substring(0, displayText.length - 1));
                setTypingSpeed(50);
            } else {
                setDisplayText(currentMessage.substring(0, displayText.length + 1));
                setTypingSpeed(100);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentMessageIndex, messages, typingSpeed]);

    return (
        <div className="typing-text">
            <span className="typing-cursor">|</span>
            {displayText}
        </div>
    );
};

const Contact = () => {
    return (
        <div className="contact-section">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <TypingText />
                </div>

                <div className="contact-info">
                    <div className="info-item">
                        <div className="info-icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="info-text">
                            <h3>Email Us</h3>
                            <p>support@greentogether.com</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">
                            <i className="fas fa-phone"></i>
                        </div>
                        <div className="info-text">
                            <h3>Call Us</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">
                            <i className="fas fa-comments"></i>
                        </div>
                        <div className="info-text">
                            <h3>Live Chat</h3>
                            <p>Available 24/7</p>
                        </div>
                    </div>
                </div>

                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact; 