import React from 'react';
import './Logo.css';
import logoVideo from '../../assets/videos/Animation - 1746461278549.mp4';

const Logo = () => {
    return (
        <div className="logo">
            <div className="video-logo">
                <video autoPlay loop muted playsInline>
                    <source src={logoVideo} type="video/mp4" />
                </video>
            </div>
            <span className="logo-text">
                <span className="green">Green</span>
                <span className="together">Together</span>
            </span>
        </div>
    );
};

export default Logo;