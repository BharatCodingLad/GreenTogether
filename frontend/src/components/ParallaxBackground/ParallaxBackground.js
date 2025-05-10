import React from 'react';
import './ParallaxBackground.css';
import Spline from '@splinetool/react-spline';

const ParallaxBackground = () => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="parallax-wrapper">
      {/* First Section - Hero */}
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
            <button onClick={scrollToAbout} className="intro-btn secondary">Learn More</button>
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

      {/* Third Section - About Us */}
      <div id="about" className="about-section">
        <div className="about-content">
          <div className="about-text-container">
            <h2 className="about-title">About <span className="highlight">GreenTogether</span></h2>
            <div className="about-description">
              <p className="animate-text">
                GreenTogether is more than just a platform – we're a community dedicated 
                to environmental sustainability and positive change. Our journey began 
                with a simple idea: connecting people who care about our planet's future.
              </p>
              <p className="animate-text delay-1">
                Through innovative technology and collaborative efforts, we've created 
                a space where individuals and organizations can work together to make 
                a meaningful impact on our environment.
              </p>
              <p className="animate-text delay-2">
                Our mission is to empower everyone to participate in environmental 
                conservation, making sustainable choices accessible and rewarding 
                for all.
              </p>
            </div>
            <div className="stats-container">
              <div className="stat-item animate-up">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item animate-up delay-1">
                <span className="stat-number">50+</span>
                <span className="stat-label">Green Projects</span>
              </div>
              <div className="stat-item animate-up delay-2">
                <span className="stat-number">100+</span>
                <span className="stat-label">Partner Companies</span>
              </div>
            </div>
          </div>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Our Beginning</h3>
                <p>Started with a vision to create a sustainable future</p>
                <div className="timeline-icon">🌱</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Community Growth</h3>
                <p>Expanded to 10,000+ active members worldwide</p>
                <div className="timeline-icon">🌍</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Innovation</h3>
                <p>Launched cutting-edge green technology solutions</p>
                <div className="timeline-icon">💡</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Global Impact</h3>
                <p>Making a difference in communities worldwide</p>
                <div className="timeline-icon">🤝</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
