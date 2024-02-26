import React from 'react';

export default function VerificationProcess({ onVerificationComplete }) {
  return (
    <div className="verification-container">
      <h2>Verification</h2>
      <p>Please verify your email address. Check your inbox for a verification email.</p>
      <button onClick={onVerificationComplete}>Go to Homepage</button>
    </div>
  );
}


