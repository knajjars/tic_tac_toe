import React, { useState } from 'react';

const Score = ({ guest_wins, host_wins }) => {
  return (
    <div>
      <p>Host wins: {host_wins}</p>
      <p>Guest wins: {guest_wins}</p>
    </div>
  );
};

export default Score;
