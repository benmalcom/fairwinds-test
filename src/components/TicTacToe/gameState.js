import { useEffect, useState } from 'react';
import { usePrevious } from './util';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
];

export const gameModes = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished',
};

export const playerIds = {
  X: 'X',
  O: 'O',
};

const INITIAL_BOARD_STATE = {
  cells: Array(9).fill(''),
  currentPlayer: null,
  winner: null,
  gameMode: gameModes.NOT_STARTED,
  players: {
    first: null,
    second: null,
  },
};

const getWinner = (cells, player) => {
  let winner;
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const combination = WINNING_COMBINATIONS[i];
    if (combination.every(index => cells[index] === player)) {
      winner = { combination, player };
      break;
    }
  }
  return winner;
};

export const useGameState = () => {
  const [boardState, setBoardState] = useState(INITIAL_BOARD_STATE);
  const [winCounts, setWinCounts] = useState({});

  const selectPlayer = playerId => {
    setBoardState(state => {
      const players = { ...state.players };
      if (!players.first) {
        players.first = playerId;
      } else {
        players.second = playerId;
      }
      return { ...state, players };
    });
  };

  const onCellClick = cellIndex => {
    if (boardState.winner) return;
    setBoardState(state => {
      const cells = [...state.cells];
      cells[cellIndex] = state.currentPlayer;
      const configUpdate = { cells };
      const winner = getWinner(cells, state.currentPlayer);
      if (winner) {
        configUpdate.winner = winner;
        configUpdate.gameMode = gameModes.FINISHED;
      } else {
        configUpdate.currentPlayer =
          state.currentPlayer === playerIds.O ? playerIds.X : playerIds.O;
      }

      return {
        ...state,
        ...configUpdate,
      };
    });
  };

  const previousGameMode = usePrevious(boardState.gameMode);
  useEffect(() => {
    if (
      previousGameMode !== gameModes.FINISHED &&
      boardState.gameMode === gameModes.FINISHED
    ) {
      // Game is finished, let's set winning counts
      const player = boardState.winner?.player;
      setWinCounts(currentCounts => ({
        [player]: currentCounts[player] ? currentCounts[player] + 1 : 1,
      }));
    }
  }, [boardState.gameMode, boardState.winner, previousGameMode]);

  const isATie = !boardState.winner && boardState.cells.every(value => !!value);
  const isCellsEmpty = boardState.cells.every(value => !value);

  return { onCellClick, isATie, winCounts, selectPlayer, boardState };
};