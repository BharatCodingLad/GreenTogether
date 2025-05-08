import React, { useState, useEffect, useRef } from 'react';
import './UserDashboard.css';
import { FaUser, FaHistory, FaCog, FaLeaf, FaWind, FaRecycle, FaTree, FaChartLine, FaRobot, FaPaperPlane, FaComments, FaTimes, FaBars } from 'react-icons/fa';

// API Configuration
const AQI_API_URL = 'https://api.openaq.org/v2/latest';
const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [aqiData, setAqiData] = useState(null);
    const [aqiLoading, setAqiLoading] = useState(true);
    const [aqiError, setAqiError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [showSidebarChat, setShowSidebarChat] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsTyping(true);

        try {
            // Build the conversation, ensuring alternation and starting with user after system
            const systemMessage = {
                role: 'system',
                content: 'You are an eco-friendly assistant helping users with environmental questions and tips.'
            };
            // Build alternated messages
            const alternated = [];
            let lastRole = null;
            messages.forEach(msg => {
                const role = msg.sender === 'user' ? 'user' : 'assistant';
                if (role !== lastRole) {
                    alternated.push({ role, content: msg.text });
                    lastRole = role;
                }
            });
            // Add the new user message
            if (alternated.length === 0 || alternated[alternated.length - 1].role !== 'user') {
                alternated.push({ role: 'user', content: newMessage });
            }

            const apiMessages = [systemMessage, ...alternated];
            console.log('Sending to LM Studio:', { messages: apiMessages });

            const response = await fetch(LM_STUDIO_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 500,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('LM Studio Error Response:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('LM Studio Response:', data);

            if (data.choices && data.choices[0] && data.choices[0].message) {
                const botResponse = {
                    id: messages.length + 2,
                    text: data.choices[0].message.content,
                    sender: 'bot'
                };
                setMessages(prev => [...prev, botResponse]);
            } else {
                throw new Error('Invalid response format from LM Studio');
            }
        } catch (error) {
            console.error('Error calling LM Studio:', error);
            const errorMessage = {
                id: messages.length + 2,
                text: "I'm having trouble connecting to my brain right now. Please check the console for more details.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Fetch AQI data
    useEffect(() => {
        const fetchAQIData = async () => {
            try {
                const response = await fetch(`${AQI_API_URL}?limit=1&page=1&offset=0&sort=desc&radius=1000&country=IN&city=Bengaluru&order_by=lastUpdated&dumpRaw=false`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const latestReading = data.results[0].measurements.find(m => m.parameter === 'pm25');
                    if (latestReading) {
                        setAqiData({
                            value: latestReading.value,
                            unit: latestReading.unit,
                            parameter: latestReading.parameter,
                            lastUpdated: new Date(latestReading.lastUpdated).toLocaleString()
                        });
                    } else {
                        setAqiError('No PM2.5 measurements found');
                    }
                } else {
                    setAqiError('No AQI data found for Bengaluru');
                }
                setAqiLoading(false);
            } catch (error) {
                console.error('Error fetching AQI data:', error);
                setAqiError('Failed to fetch AQI data: ' + error.message);
                setAqiLoading(false);
            }
        };

        fetchAQIData();
        const interval = setInterval(fetchAQIData, 300000);
        return () => clearInterval(interval);
    }, []);

    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        points: 1250,
        level: 'Eco Warrior',
        joinDate: '2024-01-15',
        activities: [
            { id: 1, type: 'Recycling', points: 50, date: '2024-03-15', status: 'completed' },
            { id: 2, type: 'Tree Planting', points: 100, date: '2024-03-10', status: 'completed' },
            { id: 3, type: 'Clean-up Drive', points: 75, date: '2024-03-05', status: 'completed' },
            { id: 4, type: 'Eco Workshop', points: 30, date: '2024-03-01', status: 'upcoming' }
        ],
        achievements: [
            { id: 1, name: 'Recycling Master', icon: '♻️', progress: 100 },
            { id: 2, name: 'Tree Guardian', icon: '🌳', progress: 75 },
            { id: 3, name: 'Eco Educator', icon: '📚', progress: 50 },
            { id: 4, name: 'Clean-up Champion', icon: '🧹', progress: 90 }
        ],
        stats: {
            treesPlanted: 15,
            cleanupsAttended: 8,
            workshopsConducted: 3
        }
    });

    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New recycling challenge available!', type: 'challenge', read: false },
        { id: 2, message: 'Your tree planting event is tomorrow', type: 'event', read: false },
        { id: 3, message: 'You earned 50 points for recycling', type: 'points', read: true }
    ]);

    const renderProfile = () => (
        <div className="profile-section">
            <div className="profile-header">
                <div className="profile-avatar">
                    <FaUser size={40} />
                </div>
                <div className="profile-info">
                    <h2>{userData.name}</h2>
                    <p className="user-level">{userData.level}</p>
                    <p className="user-email">{userData.email}</p>
                </div>
            </div>
            <div className="profile-stats">
                <div className="stat-card">
                    <FaLeaf className="stat-icon" />
                    <div className="stat-info">
                        <h3>{userData.points}</h3>
                        <p>Total Points</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaWind className="stat-icon" />
                    <div className="stat-info">
                        {aqiLoading ? (
                            <p>Loading AQI...</p>
                        ) : aqiError ? (
                            <p>{aqiError}</p>
                        ) : (
                            <>
                                <h3>{aqiData.value} {aqiData.unit}</h3>
                                <p>Current AQI ({aqiData.parameter})</p>
                                <small>Last updated: {aqiData.lastUpdated}</small>
                            </>
                        )}
                    </div>
                </div>
                <div className="stat-card">
                    <FaTree className="stat-icon" />
                    <div className="stat-info">
                        <h3>{userData.stats.treesPlanted}</h3>
                        <p>Trees Planted</p>
                    </div>
                </div>
            </div>
            <div className="achievements-section">
                <h3>Achievements</h3>
                <div className="achievements-grid">
                    {userData.achievements.map(achievement => (
                        <div key={achievement.id} className="achievement-card">
                            <span className="achievement-icon">{achievement.icon}</span>
                            <h4>{achievement.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress" 
                                    style={{ width: `${achievement.progress}%` }}
                                ></div>
                            </div>
                            <p>{achievement.progress}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderActivities = () => (
        <div className="activities-section">
            <div className="activities-header">
                <h2>Your Activities</h2>
                <button className="new-activity-btn">New Activity</button>
            </div>
            <div className="activities-list">
                {userData.activities.map(activity => (
                    <div key={activity.id} className="activity-card">
                        <div className="activity-icon">
                            {activity.type === 'Recycling' && <FaRecycle />}
                            {activity.type === 'Tree Planting' && <FaTree />}
                            {activity.type === 'Clean-up Drive' && <FaLeaf />}
                            {activity.type === 'Eco Workshop' && <FaChartLine />}
                        </div>
                        <div className="activity-info">
                            <h3>{activity.type}</h3>
                            <p className="activity-date">{activity.date}</p>
                            <span className={`activity-status ${activity.status}`}>
                                {activity.status}
                            </span>
                        </div>
                        <div className="activity-points">
                            <span>+{activity.points}</span>
                            <p>points</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderChat = (isSidebar = false) => (
        <div className={isSidebar ? "chat-section" : "chat-section"} style={isSidebar ? {height: '100%', borderRadius: 0, boxShadow: 'none'} : {}}>
            <div className="chat-messages">
                {/* Static greeting message, not sent to API */}
                <div className="message bot-message">
                    <div className="message-icon">
                        <FaRobot />
                    </div>
                    <div className="message-content">
                        Greenie, your go-to Genie for all your planting needs! How can I help you today?
                    </div>
                </div>
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                        <div className="message-icon">
                            {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                        </div>
                        <div className="message-content">
                            {message.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message bot-message">
                        <div className="message-icon">
                            <FaRobot />
                        </div>
                        <div className="message-content typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="chat-input" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    style={{flex: 1, minWidth: 0, background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '20px', padding: '10px 15px', fontSize: '14px'}}
                />
                <button type="submit" disabled={isTyping} style={{marginLeft: 0}}>
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );

    const renderSettings = () => (
        <div className="settings-section">
            <h2>Settings</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3>Account Settings</h3>
                    <div className="settings-form">
                        <div className="form-group">
                            <label>Display Name</label>
                            <input type="text" defaultValue={userData.name} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" defaultValue={userData.email} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" />
                        </div>
                        <button className="save-btn">Save Changes</button>
                    </div>
                </div>
                <div className="settings-card">
                    <h3>Notifications</h3>
                    <div className="notification-settings">
                        <div className="notification-item">
                            <input type="checkbox" id="email-notif" defaultChecked />
                            <label htmlFor="email-notif">Email Notifications</label>
                        </div>
                        <div className="notification-item">
                            <input type="checkbox" id="challenge-notif" defaultChecked />
                            <label htmlFor="challenge-notif">Challenge Updates</label>
                        </div>
                        <div className="notification-item">
                            <input type="checkbox" id="event-notif" defaultChecked />
                            <label htmlFor="event-notif">Event Reminders</label>
                        </div>
                        <div className="notification-item">
                            <input type="checkbox" id="points-notif" defaultChecked />
                            <label htmlFor="points-notif">Points Updates</label>
                        </div>
                    </div>
                </div>
                <div className="settings-card">
                    <h3>Privacy Settings</h3>
                    <div className="privacy-settings">
                        <div className="privacy-item">
                            <input type="checkbox" id="profile-public" defaultChecked />
                            <label htmlFor="profile-public">Public Profile</label>
                        </div>
                        <div className="privacy-item">
                            <input type="checkbox" id="show-activity" defaultChecked />
                            <label htmlFor="show-activity">Show Activity History</label>
                        </div>
                        <div className="privacy-item">
                            <input type="checkbox" id="show-points" defaultChecked />
                            <label htmlFor="show-points">Show Points</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="user-dashboard">
            {/* Collapsible Sidebar with animation class, no title */}
            <div className={`dashboard-sidebar sidebar-animated${sidebarOpen ? ' open' : ' closed'}`} style={sidebarOpen ? {} : {width: 0, minWidth: 0, overflow: 'hidden', padding: 0}}>
                {/* Hamburger button inside sidebar, top left, only when open */}
                {sidebarOpen && (
                    <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(false)} style={{background: 'none', border: 'none', fontSize: '2rem', color: '#fff', cursor: 'pointer', margin: '0 0 1.5rem 1.5rem', display: 'block'}}>
                        <FaBars />
                    </button>
                )}
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaUser /> Profile
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'activities' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activities')}
                    >
                        <FaHistory /> Activities
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        <FaRobot /> Greenie, your go-to Genie
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <FaCog /> Settings
                    </button>
                </nav>
            </div>
            <div className="dashboard-content" style={sidebarOpen ? {} : {marginLeft: 0}}>
                <div className="dashboard-header" style={{display: 'flex', alignItems: 'center'}}>
                    {/* Hamburger button in line with heading, only when sidebar is closed */}
                    {!sidebarOpen && (
                        <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)} style={{background: 'none', border: 'none', fontSize: '2rem', color: '#333', cursor: 'pointer', marginRight: '1rem'}}>
                            <FaBars />
                        </button>
                    )}
                    <h1 style={{margin: 0}}>{activeTab === 'chat' ? 'Greenie, your go-to Genie for all your planting needs' : 'Dashboard'}</h1>
                    <div className="notifications" style={{marginLeft: 'auto'}}>
                        <div className="notification-bell">
                            <span className="notification-count">
                                {notifications.filter(n => !n.read).length}
                            </span>
                            🔔
                        </div>
                    </div>
                </div>
                <div className="dashboard-main">
                    {activeTab === 'profile' && renderProfile()}
                    {activeTab === 'activities' && renderActivities()}
                    {activeTab === 'chat' && renderChat(false)}
                    {activeTab === 'settings' && renderSettings()}
                </div>
            </div>
            {/* Floating Action Button for Sidebar Chat */}
            <div className="greenie-fab" onClick={() => setShowSidebarChat(true)} title="Chat with Greenie">
                <FaComments />
            </div>
            {/* Sidebar Chat Popup */}
            {showSidebarChat && (
                <div className="greenie-sidebar-chat">
                    <div className="greenie-sidebar-header">
                        Greenie, your go-to Genie for all your planting needs
                        <button className="greenie-sidebar-close" onClick={() => setShowSidebarChat(false)}><FaTimes /></button>
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        {renderChat(true)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard; 