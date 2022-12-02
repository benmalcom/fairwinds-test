import PropTypes from 'prop-types';
import './Record.scss';
import { Button } from 'components/ui/Button';
import { InfoText } from 'components/ui/InfoText';

const Record = ({ onPlayAgain, winnings, gameStatusText, players }) => {
  const totalWinsAndLosses = Object.entries(winnings)
    .filter(([key]) => key !== 'tie')
    .reduce((acc, [, value]) => acc + value, 0);

  const playerWinCount = winnings[players.first] || 0;

  return (
    <div className="Record">
      <InfoText className="player-status">{gameStatusText}</InfoText>
      <InfoText className="player-statistics">
        You have won {playerWinCount} times and lost{' '}
        {totalWinsAndLosses - playerWinCount} times
      </InfoText>
      <div className="actions">
        <Button onClick={onPlayAgain}>Play Again</Button>
      </div>
    </div>
  );
};

Record.propTypes = {
  gameStatusText: PropTypes.string.isRequired,
  players: PropTypes.objectOf(PropTypes.string),
  winnings: PropTypes.objectOf(PropTypes.number),
  onPlayAgain: PropTypes.func.isRequired,
};

export default Record;
