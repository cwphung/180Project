import React from 'react';
import "./PVP.css";

function PVP({ onBackToHome }) {
  return (
    <div className="pvp-container">
      <h1>Twitch Stream</h1>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
      <div id="twitch-embed"></div>
    </div>
  );
}

export default PVP;