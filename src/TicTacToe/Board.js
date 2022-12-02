import { useState } from 'react';
import './Board.scss';
import Cell from './Cell';

const PLAYER_O = 'o';
const PLAYER_X = 'x';
const WINNING_COMBS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
];

const INITIAL_BOARD_CONFIG = {
  cells: Array(9).fill(''),
  currentPlayer: PLAYER_O,
  winner: undefined,
};

const getWinner = (cells, currentPlayer) => {
  let winner;
  for (let i = 0; i < WINNING_COMBS.length; i++) {
    const combination = WINNING_COMBS[i];
    if (combination.every(index => cells[index] === currentPlayer)) {
      winner = { combination, player: currentPlayer };
      break;
    }
  }
  return winner;
};

const Board = () => {
  const [boardConfig, setBoardConfig] = useState(INITIAL_BOARD_CONFIG);

  const handleCellClick = cellIndex => {
    if (boardConfig.winner) return;
    setBoardConfig(state => {
      const cells = [...state.cells];
      cells[cellIndex] = state.currentPlayer;
      const configUpdate = { cells };
      const winner = getWinner(cells, state.currentPlayer);
      if (!winner) {
        configUpdate.currentPlayer =
          state.currentPlayer === PLAYER_O ? PLAYER_X : PLAYER_O;
      }

      return {
        ...state,
        ...configUpdate,
        winner,
      };
    });
  };

  const itsATie =
    !boardConfig.winner && boardConfig.cells.every(value => !!value);
  const isCellsEmpty = boardConfig.cells.every(value => !value);

  return (
    <div id="wrapper">
      {itsATie && <div className="info">It's a tie</div>}
      {boardConfig.winner && (
        <div className="info">
          {boardConfig.winner.player === PLAYER_O ? 'Player O' : 'Player X'}{' '}
          wins
        </div>
      )}
      {!isCellsEmpty && (
        <button id="reset" onClick={() => setBoardConfig(INITIAL_BOARD_CONFIG)}>
          Reset game
        </button>
      )}
      <div id="board">
        {boardConfig.cells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            cellIndex={index}
            onClick={handleCellClick}
            winner={boardConfig.winner}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
