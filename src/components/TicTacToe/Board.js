import cx from 'classnames';
import PropTypes from 'prop-types';
import './Board.scss';
import { Button } from 'components/ui/Button';
import { InfoText } from 'components/ui/InfoText';

const Board = ({
  cells,
  onCellClick,
  winner,
  onPlayAgain,
  gameStatusText,
  onSeeRecord,
  showActionButtons,
}) => {
  return (
    <div className="Board">
      <InfoText className="player-status">{gameStatusText}</InfoText>
      <div className="board-inner">
        {cells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            cellIndex={index}
            onClick={onCellClick}
            winner={winner}
          />
        ))}
      </div>
      <div className="actions">
        {showActionButtons && (
          <>
            <Button onClick={onPlayAgain}>Play Again</Button>
            <Button onClick={onSeeRecord}>See Record</Button>
          </>
        )}
      </div>
    </div>
  );
};

Board.propTypes = {
  winnings: PropTypes.objectOf(PropTypes.number),
  gameStatusText: PropTypes.string.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  cells: PropTypes.arrayOf(PropTypes.string).isRequired,
  winner: PropTypes.shape({
    player: PropTypes.string.isRequired,
    combination: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  onCellClick: PropTypes.func.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onSeeRecord: PropTypes.func.isRequired,
  showActionButtons: PropTypes.bool,
};

export default Board;

const Cell = ({ value, onClick, cellIndex, winner }) => {
  return (
    <div
      className={cx('Cell', {
        winner: !!winner && winner.combination.includes(cellIndex),
        invalid: !!winner && !winner.combination.includes(cellIndex),
      })}
      onClick={() => onClick(cellIndex)}
    >
      {value}
    </div>
  );
};

Cell.propTypes = {
  value: PropTypes.string,
  winner: PropTypes.shape({
    player: PropTypes.string.isRequired,
    combination: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  cellIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
