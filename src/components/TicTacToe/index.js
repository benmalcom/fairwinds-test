import { useState } from 'react';
import './index.scss';
import Board from './Board';
import { useGameState } from './gameState';
import PlayerSelection from './PlayerSelection';

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

const TicTacToe = () => {
  const [boardConfig, setBoardConfig] = useState(INITIAL_BOARD_CONFIG);
  const { winCounts, isATie, onCellClick, selectPlayer, boardState } =
    useGameState();

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
      <PlayerSelection
        onMatchPlayer={() => {}}
        selectPlayer={selectPlayer}
        players={boardState.players}
      />
      {/*<Board
        cells={boardConfig.cells}
        onCellClick={handleCellClick}
        winner={boardConfig.winner}
      />*/}
    </div>
  );
};

export default TicTacToe;
