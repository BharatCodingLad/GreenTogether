import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-section" id="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">Get in <span className="highlight">Touch</span></h2>
                    <p className="contact-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">📍</div>
                            <h3>Our Location</h3>
                            <p>123 Green Street, Eco City, 12345</p>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📧</div>
                            <h3>Email Us</h3>
                            <p>contact@greentogether.com</p>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">📞</div>
                            <h3>Call Us</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                            <label className="form-label">Your Name</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                            <label className="form-label">Your Email</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                            <label className="form-label">Subject</label>
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="form-input"
                                rows="5"
                            ></textarea>
                            <label className="form-label">Your Message</label>
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="success-message">
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="error-message">
                                Oops! Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact; 