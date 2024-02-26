import React, { useState } from 'react';
import "./PVE.css";

const choices = ['rock', 'paper', 'scissors'];

function PVE({ onBackToHome }) {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(''); 
  const [isChatVisible, setIsChatVisible] = useState(true); 

  const getComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    return randomChoice;
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "It's a tie!";
    }
    if ((user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')) {
      return 'You win!';
    }
    return 'Computer wins!';
  };

  const handleChoice = (choice) => {
    const computer = getComputerChoice();
    setUserChoice(choice);
    const gameResult = determineWinner(choice, computer);
    setResult(gameResult);
    // Add game choices and results to the chat
    sendMessage(`You chose ${choice} and the computer chose ${computer}. ${gameResult}`);
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== '') {
      setMessages([...messages, msg]);
      setCurrentMessage(''); 
    }
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault(); 
    sendMessage(currentMessage);
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="pve-container">
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
      <h2>Rock, Paper, Scissors</h2>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)}>{choice}</button>
        ))}
      </div>
      {userChoice && <p>Your choice: {userChoice}</p>}
      {computerChoice && <p>Computer's choice: {computerChoice}</p>}
      <p>{result}</p>
  
      <button onClick={toggleChatVisibility} className={`chat-toggle ${!isChatVisible ? 'chat-toggle-hidden' : ''}`}>
        {isChatVisible ? 'Hide Chat' : 'AI assistant'}
      </button>
  
      {isChatVisible && (
        <div className="chat-box">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
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
      )}
    </div>
  );
  
}

export default PVE;