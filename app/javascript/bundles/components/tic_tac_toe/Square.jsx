import React, { useState } from 'react';

const style = {
  background: 'lightblue',
  border: '2px solid darkblue',
  fontSize: '30px',
  fontWeight: '800',
  cursor: 'pointer',
  outline: 'none',
};

const Square = ({ value }) => (
  <button style={style} onClick={() => console.log('hi')}>
    {value}
  </button>
);

export default Square;
