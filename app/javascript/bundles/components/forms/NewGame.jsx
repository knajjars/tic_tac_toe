import React, { useState } from 'react';

const NewGame = (props) => {
  const [name, setName] = useState('');

  return (
    <div>
      <label>Name of the game room</label>
      <input
        type="text"
        name="game[name]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" value="Create game" />
    </div>
  );
};

export default NewGame;
