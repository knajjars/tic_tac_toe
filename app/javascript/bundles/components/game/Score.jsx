import React, { useState } from 'react';

const Score = ({ contrary_wins, contrary_name, user_wins }) => {
  return (
    <div>
      <p>Your wins: {user_wins}</p>
      <p>
        {contrary_name} wins: {contrary_wins}
      </p>
    </div>
  );
};

export default Score;
