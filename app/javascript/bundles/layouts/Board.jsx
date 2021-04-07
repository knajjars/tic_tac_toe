import React, { useState } from 'react';
import axios from 'axios';

import Square from '../components/game/Square';

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '250px',
  height: '250px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
};

const Board = ({ value, user, game_id, player }) => {
  const onClick = (position) => async (e) => {
    e.preventDefault();
    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    await axios.post(`/games/${game_id}/make_move.json`, { player, position });
  };

  return (
    <div style={style}>
      <Square player={player} onClick={onClick([0, 0])} />
      <Square player={player} onClick={onClick([0, 1])} />
      <Square player={player} onClick={onClick([0, 2])} />
      <Square player={player} onClick={onClick([1, 0])} />
      <Square player={player} onClick={onClick([1, 1])} />
      <Square player={player} onClick={onClick([1, 2])} />
      <Square player={player} onClick={onClick([2, 0])} />
      <Square player={player} onClick={onClick([2, 1])} />
      <Square player={player} onClick={onClick([2, 2])} />
    </div>
  );
};

export default Board;
