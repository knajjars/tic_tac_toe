import React, { useState } from 'react';

const Score = ({ guest_wins, host_wins }) => {
  return (
    <div>
      <p>
        Host wins:
        <span className="badge bg-warning text-dark">{host_wins}</span>
      </p>
      <p>
        Guest wins:
        <span className="badge bg-warning text-dark">{guest_wins}</span>
      </p>
    </div>
  );
};

export default Score;
