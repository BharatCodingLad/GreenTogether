import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { FiSend, FiX, FiClock } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

const NAVBAR_HEIGHT = 80; // px, matches MainNavbar
const API_URL = 'http://localhost:4000/api/greenieai/chat';

const ChatBot = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [greet, setGreet] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Collapse/expand based on #hero visibility, with earlier collapse
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.4) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      },
      { threshold: [0, 0.4, 1] }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Hide greeting after first user message
  useEffect(() => {
    if (messages.some(m => m.sender === 'user')) {
      setTimeout(() => setGreet(false), 400);
    }
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
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
        alternated.push({ role: 'user', content: input });
      }

      console.log('Sending to LM Studio:', { messages: alternated });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: alternated,
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

  // Show greeting if no user messages yet
  const showGreeting = greet && !messages.some(m => m.sender === 'user');

  return (
    <>
      <div
        className="chatbot-container"
        style={{
          bottom: 0,
          right: 0,
          top: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="chatbot-header">
          <button className="chatbot-history-btn"><FiClock /></button>
          <span className="chatbot-header-title">GreenieAI</span>
          <button className="chatbot-close" onClick={() => setOpen(false)}><FiX /></button>
        </div>
        <div className="chatbot-body">
          {showGreeting ? (
            <div className="chatbot-startup">
              <div className="chatbot-greeting">👋 Welcome to GreenieAI!</div>
              <form className="chatbot-input-row" onSubmit={handleSend}>
                <div className="chatbot-input-wrapper">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isTyping}
                  />
                  <button className="chatbot-send-btn" type="submit" disabled={isTyping}><FiSend size={20} /></button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="chatbot-history">
                {messages.map((msg, idx) => (
                  <div key={msg.id || idx} className={`chatbot-msg ${msg.sender}`}>
                    <span>{msg.text}</span>
                  </div>
                ))}
                {isTyping && (
                  <div className="chatbot-msg bot">
                    <span className="typing-indicator">
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form className="chatbot-input-row" onSubmit={handleSend}>
                <div className="chatbot-input-wrapper">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isTyping}
                  />
                  <button className="chatbot-send-btn" type="submit" disabled={isTyping}>
                    <IoSend size={20} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      {!open && (
        <div className="chatbot-fab-oval" style={{ bottom: 0, right: 0 }} onClick={() => setOpen(true)}>
          <span className="greenieai-text">GreenieAI</span>
        </div>
      )}
    </>
  );
};

export default ChatBot; 