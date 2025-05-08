import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';
import logoVideo from '../../assets/videos/Animation - 1746461278549.mp4';

const LoadingScreen = ({ active, onAnimationComplete }) => {
    const [textJoined, setTextJoined] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);
    // Remove moveToNav state and related logic

    useEffect(() => {
        if (active) {
            // Step 1: TV shutdown effect happens automatically
            
            // Step 2: Join text after TV effect
            const textTimer = setTimeout(() => setTextJoined(true), 1500);
            
            // Step 3: Complete loading bar animations (3 cycles)
            const loadTimer = setTimeout(() => setLoadingComplete(true), 4500);
            
            // Step 4: Call animation complete callback without moving logo
            const moveTimer = setTimeout(() => {
                if (onAnimationComplete) {
                    onAnimationComplete();
                }
            }, 5000);

            return () => {
                clearTimeout(textTimer);
                clearTimeout(loadTimer);
                clearTimeout(moveTimer);
                setTextJoined(false);
                setLoadingComplete(false);
                // setMoveToNav(false); // removed
            };
        }
    }, [active, onAnimationComplete]);

    return (
        <div className={`loading-screen ${active ? 'active' : ''}`}>
            <div className="tv-effect"></div>
            <div className="loading-content">
                <div 
                    className={`loading-logo-container 
                        ${textJoined ? 'text-joined' : ''}`}
                        // removed moveToNav class
                >
                    <div className="loading-logo">
                        <video autoPlay loop muted playsInline>
                            <source src={logoVideo} type="video/mp4" />
                        </video>
                    </div>
                    <div className="logo-text">
                        <span className="green">Green</span>
                        <span className="together">Together</span>
                    </div>
                </div>
                <div className={`loading-bar ${loadingComplete ? 'fade-out' : ''}`}>
                    <div className="loading-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
