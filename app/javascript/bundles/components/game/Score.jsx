import React, { useState } from 'react';

const Score = ({ guest_wins, host_wins, player }) => {
  return (
    <div>
      <p>
        Host wins{' '}
        <span className="badge bg-warning text-dark">{host_wins}</span>
      </p>
      <p>
        Guest wins{' '}
        <span className="badge bg-warning text-dark">{guest_wins}</span>
      </p>

      <p>
        You are playing as <span className="badge bg-info">{player}</span>
      </p>
    </div>
  );
};

export default Score;
