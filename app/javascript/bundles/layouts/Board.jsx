import React, { useState } from 'react';
import axios from 'axios';

import Square from '../components/tic_tac_toe/Square';

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '250px',
  height: '250px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
};

class Board = ({ value, user, game_id }) => {
  const [name, setName] = useState('');
  const onClick = async () => {

    await axios.post(`/games/${game_id}/make_move`);
  };
  return (
    <div style={style}>
      <Square value={value} position={[0, 0]} onClick={onClick} />
      <Square value={value} position={[0, 1]} onClick={onClick} />
      <Square value={value} position={[0, 2]} onClick={onClick} />
      <Square value={value} position={[1, 0]} onClick={onClick} />
      <Square value={value} position={[1, 1]} onClick={onClick} />
      <Square value={value} position={[1, 2]} onClick={onClick} />
      <Square value={value} position={[2, 0]} onClick={onClick} />
      <Square value={value} position={[2, 1]} onClick={onClick} />
      <Square value={value} position={[2, 2]} onClick={onClick} />
    </div>
  );
};

export default Board;
