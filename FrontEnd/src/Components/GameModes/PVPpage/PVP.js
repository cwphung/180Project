import React, { useEffect } from 'react';
import "./PVP.css";

function PVP({ onBackToHome }) {
  useEffect(() => {
    const embedTwitch = () => {
      if (window.Twitch && window.Twitch.Embed) {
        const existingEmbed = document.getElementById("twitch-embed");
        if (existingEmbed) {
          while (existingEmbed.firstChild) {
            existingEmbed.removeChild(existingEmbed.firstChild);
          }
        }

        new window.Twitch.Embed("twitch-embed", {
          width: "100%",
          height: "100%",
          channel: "nihs_nooj",
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

  return (
    <div className="pvp-container">
      <div className="rest-of-content">
        {/* Other content goes here */}
      </div>
      <div className="twitch-embed-container" id="twitch-embed">
        {/* Twitch embed will go here */}
      </div>
        <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default PVP;
