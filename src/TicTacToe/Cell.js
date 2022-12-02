import PropTypes from 'prop-types';
import cx from 'classnames';
import './Cell.scss';

const Cell = ({ value, onClick, cellIndex, winner }) => {
  return (
    <div
      className={cx('cell', {
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

export default Cell;
