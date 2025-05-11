import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        credits: 0,
        paymentHistory: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = () => {
        try {
            // Get user data from localStorage
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');

            // Sort purchases by date (most recent first)
            const sortedPurchases = purchases.sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );

            setProfile({
                username: userData.email || 'User',
                email: userData.email || 'user@example.com',
                credits: userData.credits || 0,
                paymentHistory: sortedPurchases
            });
            setLoading(false);
        } catch (err) {
            console.error('Error loading profile:', err);
            setLoading(false);
        }
    };

    if (loading) return <div className="profile-loading">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>My Profile</h1>
                <div className="profile-credits">
                    <span className="credits-label">Green Credits:</span>
                    <span className="credits-amount">🌱 {profile.credits}</span>
                </div>
            </div>

            <div className="profile-info">
                <div className="info-group">
                    <label>Username</label>
                    <p>{profile.username}</p>
                </div>
                <div className="info-group">
                    <label>Email</label>
                    <p>{profile.email}</p>
                </div>
            </div>

            <div className="payment-history">
                <h2>Purchase History</h2>
                {profile.paymentHistory.length === 0 ? (
                    <p className="no-history">No purchases yet</p>
                ) : (
                    <div className="history-list">
                        {profile.paymentHistory.map((payment, index) => (
                            <div key={index} className="payment-item">
                                <div className="payment-info">
                                    <h3>{payment.plantName}</h3>
                                    <p className="payment-date">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </p>
                                    <p className="payment-clicks">
                                        👆 Clicked {payment.clicks} times
                                    </p>
                                </div>
                                <div className="payment-details">
                                    <span className="payment-amount">₹{payment.amount}</span>
                                    <span className="credits-earned">+{payment.creditsEarned} credits</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="profile-summary">
                <h2>Shopping Summary</h2>
                <div className="summary-stats">
                    <div className="stat-item">
                        <span className="stat-label">Total Purchases</span>
                        <span className="stat-value">{profile.paymentHistory.length}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total Spent</span>
                        <span className="stat-value">
                            ₹{profile.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)}
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total Credits Earned</span>
                        <span className="stat-value">
                            🌱 {profile.paymentHistory.reduce((sum, payment) => sum + payment.creditsEarned, 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 