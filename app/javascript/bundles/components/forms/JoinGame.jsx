import React, { useState } from 'react';

const JoinGame = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <label>Game room password</label>
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input type="submit" value="Join" />
    </div>
  );
};

export default JoinGame;
