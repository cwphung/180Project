import React, { useState } from 'react';
import './ChatBox.css'; 

function ChatBox({ onSendMessage, messages }) { 
  const [currentMessage, setCurrentMessage] = useState('');

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (currentMessage.trim() !== '') {
      onSendMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> 
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={currentMessage}
          onChange={handleMessageChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;

