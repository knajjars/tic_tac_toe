import ReactOnRails from 'react-on-rails';

import NewGame from '../bundles/components/forms/NewGame';
import JoinGame from '../bundles/components/forms/JoinGame';
import Board from '../bundles/layours/Board';

ReactOnRails.register({
  Board,
  NewGame,
  JoinGame,
});
