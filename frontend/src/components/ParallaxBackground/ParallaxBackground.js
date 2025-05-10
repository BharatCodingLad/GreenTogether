import React from 'react';
import './ParallaxBackground.css';
import Spline from '@splinetool/react-spline';

const ParallaxBackground = () => {
  return (
    <div className="parallax-wrapper">
      <div className="container">
        {/* Spline Container - Full Page Background */}
        <div className="spline-container">
          <Spline 
            scene="https://prod.spline.design/nBQNpgz0XGvJNTsa/scene.splinecode" 
          />
        </div>

        {/* Introduction Section - Overlaid */}
        <div className="intro-section">
          <h1 className="intro-title">Welcome to <span className="highlight">GreenTogether</span></h1>
          <p className="intro-description">
            Join us in our mission to create a sustainable future. Together, we can make 
            a difference in building a better world for tomorrow.
          </p>
          <div className="intro-buttons">
            <button className="intro-btn primary">Get Started</button>
            <button className="intro-btn secondary">Learn More</button>
          </div>
          <div className="typing-wrapper">
            <div className="typing-text">
              We are committed to&nbsp;
              <div className="typing-words">
                <span>protecting our environment.</span>
                <span>reducing carbon emissions.</span>
                <span>promoting renewable energy.</span>
                <span>creating eco-friendly solutions.</span>
                <span>building sustainable communities.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
