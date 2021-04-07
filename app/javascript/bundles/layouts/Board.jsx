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
  const [gameStats, setGameStats] = useState({
    host_wins: 0,
    guest_wins: 0,
    guest_moves: [],
    host_moves: [],
  });

  const [squares, setSquares] = useState([
    { position: '00', value: '' },
    { position: '01', value: '' },
    { position: '02', value: '' },
    { position: '10', value: '' },
    { position: '11', value: '' },
    { position: '12', value: '' },
    { position: '20', value: '' },
    { position: '21', value: '' },
    { position: '22', value: '' },
  ]);

  const onClick = (square) => async (e) => {
    e.preventDefault();
    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    const { data } = await axios.post(`/games/${game_id}/make_move.json`, {
      player,
      position: square.position,
    });

    setGameStats({
      host_wins: data.host_wins,
      guest_wins: data.guest_wins,
      guest_moves: data.guest_moves,
      host_moves: data.host_moves,
    });

    markSquare(square);
  };

  const markSquare = (square) => {
    if (square.value === '') {
      console.log(gameStats.host_moves);
      gameStats.guest_moves.forEach((guest_move) => {
        if (guest_move === square.position) {
          const squaresClone = [...squares].map((clonedSquare) => {
            if (clonedSquare.position === square.position) {
              clonedSquare.value = 'O';
            }
            return clonedSquare;
          });
          setSquares(squaresClone);
        }
      });

      gameStats.host_moves.forEach((host_move) => {
        if (host_move === square.position) {
          const squaresClone = [...squares].map((clonedSquare) => {
            if (clonedSquare.position === square.position) {
              clonedSquare.value = 'X';
            }
            return clonedSquare;
          });
          setSquares(squaresClone);
        }
      });
    }
  };

  return (
    <div style={style}>
      {squares.map((square) => (
        <Square
          key={JSON.stringify(square.position)}
          value={square.value}
          onClick={onClick(square)}
        />
      ))}
    </div>
  );
};

export default Board;
