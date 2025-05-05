import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isUser, setIsUser] = useState(true);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className={`app ${!isUser ? 'vendor-mode' : ''}`}>
            {/* Add shooting stars */}
            <div className="stars">
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
            </div>
            
            <Navbar isUser={isUser} setIsUser={setIsUser} />
            <div className="login-container">
                <div className={`login-box ${isSignUp ? 'sign-up-mode' : ''}`}>
                    <div className="forms-container">
                        <div className="signin-signup">
                            {/* Login Form */}
                            <form className="login-form">
                                <h2>Sign In</h2>
                                <div className="form-field">
                                    <input type="email" placeholder=" " required />
                                    <span className="placeholder">Email</span>
                                </div>
                                <div className="form-field">
                                    <input type="password" placeholder=" " required />
                                    <span className="placeholder">Password</span>
                                </div>
                                <button type="submit">Login</button>
                            </form>

                            {/* Sign Up Form */}
                            <form className="signup-form">
                                <h2>Create Account</h2>
                                <div className="form-field">
                                    <input type="text" placeholder=" " required />
                                    <span className="placeholder">Name</span>
                                </div>
                                <div className="form-field">
                                    <input type="email" placeholder=" " required />
                                    <span className="placeholder">Email</span>
                                </div>
                                <div className="form-field">
                                    <input type="password" placeholder=" " required />
                                    <span className="placeholder">Password</span>
                                </div>
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>

                        {/* Toggle Panel */}
                        <div className="panels-container">
                            <div className={`panel left-panel ${!isSignUp ? 'active' : ''}`}>
                                <div className="panel-content">
                                    <h3>New Here?</h3>
                                    <p>Join us and be part of the green revolution!</p>
                                    <button className="toggle-btn" onClick={toggleForm}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            <div className={`panel right-panel ${isSignUp ? 'active' : ''}`}>
                                <div className="panel-content">
                                    <h3>Already have an account?</h3>
                                    <p>Sign in to continue your green journey!</p>
                                    <button className="toggle-btn" onClick={toggleForm}>
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
