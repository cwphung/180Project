import React, { useState } from 'react';
import './ChatBox.css'; 

function ChatBox({ onSendMessage, messages }) { 
  const [currentMessage, setCurrentMessage] = useState('');

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendToBackend = async (message) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error:', error);
      return 'Error sending message to the backend';
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (currentMessage.trim() !== '') {
      const message = currentMessage;
      setCurrentMessage('');
      onSendMessage(message);
      const response = await sendToBackend(message);
      onSendMessage(response);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          <p>{msg}</p>
          {index < messages.length - 1 && <hr className="hr-style" />}
        </React.Fragment>
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
