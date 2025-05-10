import React from 'react';
import './ParallaxBackground.css';
import Spline from '@splinetool/react-spline';

const ParallaxBackground = () => {
  return (
    <div className="parallax-wrapper">
      {/* First Section - Hero */}
      <div className="container">
        <div className="spline-container">
          <Spline 
            scene="https://prod.spline.design/nBQNpgz0XGvJNTsa/scene.splinecode" 
          />
        </div>

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

      {/* Second Section - Features */}
      <div className="features-section">
        <h2 className="section-title">Our Green Solutions</h2>
        <p className="section-subtitle">Discover how we're making a difference</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Carbon Footprint Tracking</h3>
            <p>Monitor and reduce your environmental impact with our advanced tracking tools.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Smart Energy Solutions</h3>
            <p>Optimize your energy consumption with AI-powered recommendations.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Recycling Management</h3>
            <p>Streamline your recycling process with our comprehensive waste management system.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Community Initiatives</h3>
            <p>Connect with like-minded individuals and participate in local green projects.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Sustainability Reports</h3>
            <p>Generate detailed reports on your environmental impact and improvements.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Partner Network</h3>
            <p>Access our network of sustainable businesses and environmental experts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
