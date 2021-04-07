import React, { useState } from 'react';

const NewGame = (props) => {
  const [name, setName] = useState('');

  return (
    <div>
      <label className="form-label">Name of the game room</label>
      <input
        type="text"
        name="game[name]"
        value={name}
        className="form-control"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="submit"
        value="Create game"
        className="btn btn-primary my-2"
      />
    </div>
  );
};

export default NewGame;
