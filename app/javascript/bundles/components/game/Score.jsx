import React, { useState } from 'react';
import cx from 'classnames';

const Score = ({ guest_wins, host_wins, player, player_turn }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Game Stats</h5>
        <p>
          Host wins{' '}
          <span className="badge bg-warning text-dark">{host_wins}</span>
        </p>
        <p>
          Guest wins{' '}
          <span className="badge bg-warning text-dark">{guest_wins}</span>
        </p>

        <p>
          You are playing as{' '}
          <span
            className={cx(
              'badge text-light',
              player === 'host' ? 'bg-success' : 'bg-primary'
            )}
          >
            {player}
          </span>
        </p>

        <p>
          Player turn{' '}
          <span
            className={cx(
              'badge text-light',
              player_turn === 'host' ? 'bg-success' : 'bg-primary'
            )}
          >
            {player_turn}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Score;
