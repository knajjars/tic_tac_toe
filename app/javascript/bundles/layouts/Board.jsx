import React, { useState } from 'react';

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

const Square = ({ value }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={style}>
      <Square value=1 /</Square>
      <Square value=2 /</Square>
      <Square value=3 /</Square>
      <Square value=4 /</Square>
      <Square value=5 /</Square>
      <Square value=6 /</Square>
      <Square value=7 /</Square>
      <Square value=8 /</Square>
      <Square value=9 /</Square>
    </div>
  );
};

export default Square;
