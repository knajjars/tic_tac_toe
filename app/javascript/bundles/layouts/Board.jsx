import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import Square from '../components/game/Square';
import Score from '../components/game/Score';
import GameSessionChannel from '../../channels/game_session_channel';
import { squaresSettings, gameSettings } from '../../libs/game';

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '250px',
  height: '250px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
};

const Board = ({ value, user, game_id, player, guest_wins, host_wins }) => {
  const [gameStats, setGameStats] = useState(gameSettings);
  const [squares, setSquares] = useState(squaresSettings);

  useEffect(() => {
    GameSessionChannel(game_id).received = (data) => {
      setGameStats(data);
    };
  }, []);

  useEffect(() => {
    markSquares();
  }, [gameStats]);

  const onClick = (square) => async (e) => {
    e.preventDefault();
    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    const { data } = await axios.post(`/games/${game_id}/make_move`, {
      player,
      position: square.position,
    });
  };

  const markSquares = () => {
    const squares = cloneDeep(squaresSettings);
    gameStats.guest_moves.forEach((guest_move) => {
      const square = squares.find((square) => square.position === guest_move);
      square.value = 'X';
    });

    gameStats.host_moves.forEach((host_move) => {
      const square = squares.find((square) => square.position === host_move);
      square.value = 'O';
    });

    setSquares(squares);
  };

  return (
    <div>
      <Score guest_wins={guest_wins} host_wins={host_wins} />
      <div style={style}>
        {squares.map((square) => (
          <Square
            key={JSON.stringify(square.position)}
            value={square.value}
            onClick={onClick(square)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
