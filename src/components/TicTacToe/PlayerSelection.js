import cx from 'classnames';
import PropTypes from 'prop-types';
import './PlayerSelection.scss';
import { playerIds } from 'components/TicTacToe/util';
import { Button } from 'components/ui/Button';
import { InfoText } from 'components/ui/InfoText';

const PlayerSelection = ({
  selectPlayer,
  players,
  matchSecondPlayer,
  isWaitingForOpponent,
}) => {
  return (
    <div className={cx('PlayerSelection', { waiting: isWaitingForOpponent })}>
      {isWaitingForOpponent ? (
        <InfoText className="waiting-text">
          Waiting to find your opponent…
        </InfoText>
      ) : (
        <>
          <InfoText>Welcome</InfoText>
          <InfoText>Pick your player</InfoText>
        </>
      )}
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
      {!isWaitingForOpponent && (
        <Button onClick={matchSecondPlayer} disabled={!players.first}>
          Match me with my opponent
        </Button>
      )}
    </div>
  );
};

PlayerSelection.propTypes = {
  matchSecondPlayer: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  isWaitingForOpponent: PropTypes.bool,
  players: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
  }).isRequired,
};

export default PlayerSelection;
