import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import MainNavbar from './components/Navbar/MainNavbar';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ParallaxBackground from './components/ParallaxBackground/ParallaxBackground';
import Copyright from './components/Copyright/Copyright';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
    const [isUser, setIsUser] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [username, setUsername] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentPage, setCurrentPage] = useState('home');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        setIsLoading(true);
        setIsAnimationComplete(false);
        console.log('isLoading set to true, isAnimationComplete set to false');
    };

    const handleAnimationComplete = () => {
        console.log('Animation complete');
        setIsAnimationComplete(true);
        setIsLoading(false);
        setIsAuthenticated(true);
        console.log('isAnimationComplete set to true, isLoading set to false, isAuthenticated set to true');
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
        <div className={`app ${!isUser ? 'vendor-mode' : ''}`} onMouseMove={handleMouseMove}>
            {!isAuthenticated && (
                <>
                    <LoadingScreen active={isLoading} onAnimationComplete={handleAnimationComplete} />
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
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
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
                </>
            )}
            {isAuthenticated && isAnimationComplete && (
                <>
                    <MainNavbar 
                        username={username} 
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                    {currentPage === 'home' && (
                        <>
                            <ParallaxBackground mouseX={mousePosition.x} mouseY={mousePosition.y} />
                            <Copyright />
                        </>
                    )}
                    {currentPage === 'contact' && <Contact />}
                </>
            )}
        </div>
    );
}

export default App;
