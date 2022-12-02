import cx from 'classnames';
import PropTypes from 'prop-types';
import './PlayerSelection.scss';
import { playerIds } from 'components/TicTacToe/gameState';
import { Button } from 'components/ui/Button';

const PlayerSelection = ({ selectPlayer, players, onMatchPlayer }) => {
  console.log('players ', players);
  return (
    <div className="PlayerSelection">
      <p className="info-text">Welcome</p>
      <p className="info-text">Pick your player</p>
      <div className="options">
        {Object.values(playerIds).map(id => (
          <div
            key={id}
            className={cx('option-item', { selected: players?.first === id })}
            onClick={() => selectPlayer(id)}
          >
            {id}
          </div>
        ))}
      </div>
      <Button onClick={onMatchPlayer}>Match me with my opponent</Button>
    </div>
  );
};

PlayerSelection.propTypes = {
  onMatchPlayer: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  players: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
  }).isRequired,
};

export default PlayerSelection;
