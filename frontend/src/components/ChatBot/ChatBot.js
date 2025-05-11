import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { FiSend, FiX, FiClock, FiImage } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';

const NAVBAR_HEIGHT = 80; // px, matches MainNavbar
const API_URL = 'http://localhost:4000/api/greenieai/chat';

// Predefined plant data
const PLANT_DATA = {
  'plant_1.jpeg': {
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    description: `Here are a few points about Golden Pothos:

Air Purification: Golden Pothos is known for its ability to purify indoor air by removing common toxins like formaldehyde, xylene, and benzene.
Oxygen Production: Like all plants, it produces oxygen through photosynthesis, though the overall contribution to a room's oxygen level is modest.
Light Requirements: It's a very adaptable plant and can tolerate low to bright indirect light. Avoid direct sunlight, which can scorch the leaves.
Watering: Allow the top inch of soil to dry out between waterings. Overwatering can lead to root rot.   
Soil: It thrives in well-draining potting mix. A general-purpose potting mix should work well.`
  },
  'plant_2.jpeg': {
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    description: `Here are a few points about Peace Lilies:

Air Purification: Peace lilies are known for their ability to filter indoor air, removing toxins like formaldehyde, benzene, and trichloroethylene.
Low Light Tolerance: They can thrive in low-light conditions, making them suitable for rooms with less natural light.
Watering: Keep the soil consistently moist, but not soggy. Allow the top inch of soil to dry out slightly between waterings.   
Humidity: Peace lilies prefer high humidity. Consider misting the leaves regularly, especially in dry environments.
Flowering: They produce beautiful white flowers, which can add a touch of elegance to any space.`
  },
  'plant_3.jpeg': {
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    description: `Here are a few points about Snake Plants:

Air Purification: Snake plants are excellent at filtering the air, removing toxins such as formaldehyde, benzene, trichloroethylene, xylene, and toluene.
Oxygen Production: They are unique in that they can release oxygen at night, making them a good plant for bedrooms.
Light Requirements: Snake plants are very tolerant and can thrive in low to bright indirect light. They can even handle some direct sun, though too much can scorch the leaves.
Watering: They are drought-tolerant and prefer to dry out completely between waterings. Overwatering is a common cause of problems. Water sparingly, especially in the winter.
Soil: They need well-draining soil. A cactus or succulent potting mix is often recommended to ensure good drainage.`
  },
  'plant_4.jpeg': {
    name: 'Holy Basil',
    scientificName: 'Ocimum tenuiflorum',
    description: `Here are a few points about Holy Basil:

Medicinal Properties: Holy Basil is highly valued in Ayurveda for its various medicinal properties, including being an adaptogen that helps the body cope with stress. It's often used for its antioxidant, anti-inflammatory, and immune-boosting properties.
Oxygen Production: Like most plants, it produces oxygen through photosynthesis.
Light Requirements: Holy Basil thrives in bright, direct sunlight. It needs at least 6 hours of sun per day.
Watering: Water regularly to keep the soil consistently moist, especially during hot weather. However, ensure the pot has good drainage to prevent waterlogging.
Soil: It prefers well-draining, fertile soil. A mix of garden soil, compost, and sand works well.`
  },
  'plant_5.jpeg': {
    name: 'Turtle Vine',
    scientificName: 'Callisia repens',
    description: `Here are a few points about Turtle Vine:

Appearance: It's a trailing succulent with small, round, fleshy green leaves that often have a purple underside. This gives it a lovely two-toned appearance.
Low Maintenance: Turtle Vine is generally considered an easy-to-care-for plant, making it a popular choice for beginners.
Light Requirements: It thrives in bright, indirect light but can also tolerate lower light conditions, though the purple coloration might be less intense. Avoid direct, harsh sunlight.
Watering: Allow the soil to dry out slightly between waterings. It's relatively drought-tolerant, and overwatering can lead to root rot.
Propagation: It's very easy to propagate from stem cuttings. Simply snip off a piece and plant it in moist soil.`
  }
};

const ChatBot = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [greet, setGreet] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const getPlantInfo = (imageName) => {
    return PLANT_DATA[imageName] || {
      name: 'Unknown Plant',
      scientificName: 'Unknown',
      description: "I'm sorry, I couldn't identify this plant. Please try uploading a different image."
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      image: selectedImage
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    // If there's an image, use plant recognition
    if (selectedImage) {
      setTimeout(() => {
        let imageName = '';
        try {
          imageName = fileInputRef.current?.files[0]?.name || '';
        } catch {
          imageName = '';
        }
        if (!PLANT_DATA[imageName]) {
          const userImages = messages.filter(m => m.image).length;
          imageName = `plant_${userImages + 1}.jpeg`;
        }
        const plantInfo = getPlantInfo(imageName);
        const botResponse = {
          id: messages.length + 2,
          text: `Plant: This looks like a ${plantInfo.name} (${plantInfo.scientificName}).\n\n${plantInfo.description}`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 3000 + Math.random() * 2000);
    } else {
      // Use local AI for text messages
      try {
        const alternated = [];
        let lastRole = null;
        messages.forEach(msg => {
          const role = msg.sender === 'user' ? 'user' : 'assistant';
          if (role !== lastRole) {
            alternated.push({ role, content: msg.text });
            lastRole = role;
          }
        });
        if (alternated.length === 0 || alternated[alternated.length - 1].role !== 'user') {
          alternated.push({ role: 'user', content: input });
        }
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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
        const errorMessage = {
          id: messages.length + 2,
          text: "I'm having trouble connecting to my brain right now. Please check the console for more details.",
          sender: 'bot'
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    className="chatbot-img-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiImage />
                  </button>
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
                    {msg.image && (
                      <div className="chatbot-image-preview-container">
                        <img src={msg.image} alt="Uploaded" className="chatbot-img-preview" />
                      </div>
                    )}
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
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    className="chatbot-img-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiImage />
                  </button>
                  {selectedImage && (
                    <div className="chatbot-image-preview-container">
                      <img src={selectedImage} alt="Preview" className="chatbot-img-preview" />
                      <button
                        type="button"
                        className="chatbot-clear-image"
                        onClick={clearSelectedImage}
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
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