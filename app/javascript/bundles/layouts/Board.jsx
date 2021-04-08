import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import Square from '../components/game/Square';
import Score from '../components/game/Score';
import GameSessionChannel from '../../channels/game_session_channel';
import { squaresSettings, gameSettings } from '../../libs/game';
import { eventEmitter } from '../../libs/event';

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '350px',
  height: '350px',
  margin: '16px auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
};

const Board = ({ value, user, game_id, player, game }) => {
  const { guest_wins, host_wins, guest_moves, host_moves, player_turn } = game;
  const [gameStats, setGameStats] = useState({
    ...gameSettings,
    guest_wins,
    host_wins,
    guest_moves,
    host_moves,
    player_turn,
  });
  const [squares, setSquares] = useState(squaresSettings);

  useEffect(() => {
    GameSessionChannel(game_id).received = (data) => {
      let prevGameStats;
      setGameStats((prevState) => {
        prevGameStats = prevState;
        return data;
      });
      eventEmitter.emit('analyzeWinner', { data, gameStats: prevGameStats });
    };
  }, []);

  useEffect(() => {
    markSquares();
  }, [gameStats]);

  const onClick = (square) => async (e) => {
    if (gameStats.player_turn !== player) {
      return;
    }
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
    <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center mb-3">
      <Score
        guest_wins={gameStats.guest_wins}
        host_wins={gameStats.host_wins}
        player={player}
        player_turn={gameStats.player_turn}
      />
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
