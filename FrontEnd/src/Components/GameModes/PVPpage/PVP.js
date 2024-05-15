import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./PVP.css";

function PVP({ username, onBackToHome }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const embedTwitch = () => {
      if (window.Twitch && window.Twitch.Player) {
        const playerDivId = "twitch-embed";
        const existingPlayer = document.getElementById(playerDivId);
        if (existingPlayer) {
          while (existingPlayer.firstChild) {
            existingPlayer.removeChild(existingPlayer.firstChild);
          }
        }

        new window.Twitch.Player(playerDivId, {
          width: "100%",
          height: "100%",
          channel: "nihs_nooj",
          volume: 0.5,
          parent: ["localhost"]
        });
      }
    };

    const scriptId = 'twitch-embed-script';
  
    if (document.getElementById(scriptId)) {
      embedTwitch();
      return;
    }
  
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;
    document.body.appendChild(script);
  
    script.onload = () => embedTwitch();
  
  }, [username]); 

  useEffect(() => {
    const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:4000'); 
    setSocket(newSocket);

    const handleMessage = (message) => {
      setMessages(prevMessages => {
        return [...prevMessages, message].slice(-18);
      });    
    };

    newSocket.on('message', handleMessage);

    return () => {
        newSocket.off('message', handleMessage);
        newSocket.close();
    };
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const onGestureControl = () => {
    console.log('Gesture control activated');
  };

  const onVoiceControl = () => {
    console.log('Voice control activated');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      const formattedMessage = `${username}: ${input}`;
      socket.emit('message', formattedMessage);
      setInput(''); 
    }
  };

  const handleKeyDown = (e) => {
    if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        handleSubmit(); 
    } else {
        e.preventDefault(); 
    }
  }

  return (
    <div className="pvp-container"> 
      <div className="rest-of-content">
        <button className="gesture-control-button" onClick={onGestureControl}>
          Gesture Control
        </button>
        <button className="voice-control-button" onClick={onVoiceControl}>
          Voice Control
        </button>
      </div>
      <div className="twitch-embed-container" id="twitch-embed"></div>
      <div className="rest-of-content">
        
        <div className="chat-container">
          <div className="header">
              <h1>Pokemon</h1>
              <div className="clock">{formatTime(seconds)}</div>
          </div>
          <div className="messages">
              {messages.map((message, index) => (
                  <div key={index} className="message">{message}</div>
              ))}
          </div>
          <input 
              type="text" 
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} 
              placeholder="Type here..." 
              className="chat-input"
          />
        </div>

      </div>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default PVP;
