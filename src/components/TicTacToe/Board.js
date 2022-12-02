import cx from 'classnames';
import PropTypes from 'prop-types';
import './Board.scss';

const Board = ({ cells, onCellClick, winner }) => {
  return (
    <div className="Board">
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
  );
};

Board.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.string).isRequired,
  winner: PropTypes.shape({
    player: PropTypes.string.isRequired,
    combination: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  onCellClick: PropTypes.func.isRequired,
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
