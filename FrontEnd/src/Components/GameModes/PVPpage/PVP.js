import React, { useEffect } from 'react';
import "./PVP.css";

function PVP({ onBackToHome }) {
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
  
  }, []); 

  const onGestureControl = () => {
    console.log('Gesture control activated');
  };

  const onVoiceControl = () => {
    console.log('Voice control activated');
  };

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
      </div>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default PVP;
