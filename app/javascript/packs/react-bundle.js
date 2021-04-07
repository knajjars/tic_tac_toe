import ReactOnRails from 'react-on-rails';

import NewGame from '../bundles/components/forms/NewGame';
import Square from '../bundles/components/game/Square';
import Score from '../bundles/components/game/Score';
import Board from '../bundles/layouts/Board';

ReactOnRails.register({
  Board,
  NewGame,
  Square,
  Score,
});
