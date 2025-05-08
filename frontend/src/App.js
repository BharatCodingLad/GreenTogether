import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import UserDashboard from './components/UserDashboard/UserDashboard';
import './App.css';

function App() {
    const [isUser, setIsUser] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsLoggedIn(true);
        }, 2000);
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    if (isLoggedIn) {
        return <UserDashboard />;
    }

    return (
        <div className={`app ${!isUser ? 'vendor-mode' : ''}`}>
            <LoadingScreen active={isLoading} />
            <Navbar isUser={isUser} setIsUser={setIsUser} />
            <div className="login-container">
                <div className={`login-box ${isSignUp ? 'sign-up-mode' : ''}`}>
                    <div className="forms-container">
                        <div className="signin-signup">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2>Sign In</h2>
                                <div className="form-field">
                                    <input 
                                        type="text" 
                                        placeholder=" "
                                        required 
                                    />
                                    <span className="placeholder">Username</span>
                                </div>
                                <div className="form-field">
                                    <input 
                                        type="password" 
                                        placeholder=" "
                                        required 
                                    />
                                    <span className="placeholder">Password</span>
                                </div>
                                <button type="submit">Login</button>
                            </form>

                            <form className="signup-form" onSubmit={handleSubmit}>
                                <h2>Create Account</h2>
                                <div className="form-field">
                                    <input 
                                        type="text" 
                                        placeholder=" "
                                        required 
                                    />
                                    <span className="placeholder">Username</span>
                                </div>
                                <div className="form-field">
                                    <input 
                                        type="password" 
                                        placeholder=" "
                                        required 
                                    />
                                    <span className="placeholder">Password</span>
                                </div>
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>

                        <div className="panels-container">
                            <div className="panel left-panel">
                                <div className="panel-content">
                                    <h3>New here?</h3>
                                    <p>Join us in making the world greener, one step at a time!</p>
                                    <button className="toggle-btn" onClick={toggleMode}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>

                            <div className="panel right-panel">
                                <div className="panel-content">
                                    <h3>One of us?</h3>
                                    <p>Welcome back! Sign in to continue your green journey.</p>
                                    <button className="toggle-btn" onClick={toggleMode}>
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