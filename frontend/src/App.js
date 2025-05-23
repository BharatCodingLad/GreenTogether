import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import MainNavbar from './components/Navbar/MainNavbar';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ParallaxBackground from './components/ParallaxBackground/ParallaxBackground';
import Copyright from './components/Copyright/Copyright';
import Contact from './components/Contact/Contact';
import PlantsPage from './components/Plants/PlantsPage';
import ChatBot from './components/ChatBot/ChatBot';
import Profile from './components/Profile/Profile';
import './App.css';

// API base URL
const API_URL = 'http://localhost:4000/api';

function App() {
    const [isUser, setIsUser] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentPage, setCurrentPage] = useState('home');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setIsAnimationComplete(false);

        try {
            const endpoint = isSignUp ? '/auth/register' : '/auth/login';
            const response = await axios.post(`${API_URL}${endpoint}`, {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            setUsername(response.data.user.username);
            setIsLoading(true);
            setIsAnimationComplete(false);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setIsLoading(false);
        }
    };

    const handleAnimationComplete = () => {
        setIsAnimationComplete(true);
        setIsLoading(false);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAnimationComplete(false);
        setUsername('');
        setEmail('');
        setPassword('');
        setError('');
        setCurrentPage('home');
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Router>
            <div className={`app ${!isUser ? 'vendor-mode' : ''}`} onMouseMove={handleMouseMove}>
                {!isAuthenticated ? (
                    <>
                        <LoadingScreen active={isLoading} onAnimationComplete={handleAnimationComplete} />
                        <Navbar isUser={isUser} setIsUser={setIsUser} />
                        <div className="login-container">
                            <div className={`login-box ${isSignUp ? 'sign-up-mode' : ''}`}>
                                <div className="forms-container">
                                    <div className="signin-signup">
                                        <form className="login-form" onSubmit={handleSubmit}>
                                            <h2>Sign In</h2>
                                            {error && <div className="error-message">{error}</div>}
                                            <div className="form-field">
                                                <input 
                                                    type="email" 
                                                    placeholder=" "
                                                    required 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <span className="placeholder">Email</span>
                                            </div>
                                            <div className="form-field">
                                                <input 
                                                    type="password" 
                                                    placeholder=" "
                                                    required 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <span className="placeholder">Password</span>
                                            </div>
                                            <button type="submit">Login</button>
                                        </form>

                                        <form className="signup-form" onSubmit={handleSubmit}>
                                            <h2>Create Account</h2>
                                            {error && <div className="error-message">{error}</div>}
                                            <div className="form-field">
                                                <input 
                                                    type="email" 
                                                    placeholder=" "
                                                    required 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <span className="placeholder">Email</span>
                                            </div>
                                            <div className="form-field">
                                                <input 
                                                    type="password" 
                                                    placeholder=" "
                                                    required 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
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
                    </>
                ) : isAnimationComplete ? (
                    <>
                        <MainNavbar 
                            username={username} 
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            onLogout={handleLogout}
                        />
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <ParallaxBackground mouseX={mousePosition.x} mouseY={mousePosition.y} />
                                    <Copyright />
                                </>
                            } />
                            <Route path="/plants" element={<PlantsPage />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                        <ChatBot />
                    </>
                ) : (
                    <LoadingScreen active={true} onAnimationComplete={handleAnimationComplete} />
                )}
            </div>
        </Router>
    );
}

export default App;
