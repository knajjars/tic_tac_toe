import PropTypes from 'prop-types';
import React, { useState } from 'react';

const GameForm = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <label>Name of the game room</label>
      <input
        type="text"
        name="game[name]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Password to join room</label>
      <input
        type="text"
        name="game[password]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input type="submit" value="Create game" />
    </div>
  );
};

export default GameForm;
