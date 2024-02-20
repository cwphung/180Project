import React, { useState } from 'react';
import "./PVE.css";

const choices = ['rock', 'paper', 'scissors'];

function PVE({ onBackToHome }) {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

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
    </div>
  );
}

export default PVE;
