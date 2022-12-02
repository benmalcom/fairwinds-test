import { useEffect, useState } from 'react';
import {
  gameModes,
  playerIds,
  usePrevious,
  getWinnerFromBoardState,
} from './util';

const INITIAL_BOARD_STATE = {
  cells: Array(9).fill(''),
  currentPlayer: null,
  winner: null,
  gameMode: gameModes.NOT_STARTED,
};

export const useGameState = () => {
  const [boardState, setBoardState] = useState(INITIAL_BOARD_STATE);
  const [winnings, setWinnings] = useState({});
  const [players, setPlayers] = useState({ first: null, second: null });
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);

  const selectPlayer = playerId => {
    setPlayers(currentPlayers => {
      const players = { ...currentPlayers };
      if (!players.first) {
        players.first = playerId;
      } else {
        players.second = playerId;
      }
      return players;
    });
  };

  const onCellClick = cellIndex => {
    if (boardState.winner) return;
    setBoardState(state => {
      const cells = [...state.cells];
      cells[cellIndex] = state.currentPlayer;
      const configUpdate = { cells };
      const winner = getWinnerFromBoardState(cells, state.currentPlayer);
      if (winner) {
        configUpdate.winner = winner;
        configUpdate.gameMode = gameModes.FINISHED;
      } else {
        configUpdate.currentPlayer =
          state.currentPlayer === playerIds.O ? playerIds.X : playerIds.O;
      }
      if (
        cells.every(value => !!value) &&
        configUpdate.gameMode !== gameModes.FINISHED
      )
        configUpdate.gameMode = gameModes.FINISHED;

      return {
        ...state,
        ...configUpdate,
      };
    });
  };

  const matchSecondPlayer = () => {
    if (!players.first) return;
    setIsWaitingForOpponent(true);
  };

  const onPlayAgain = () => {
    if (boardState.winner?.player) {
      setLastWinner(boardState.winner?.player);
    }
    setBoardState({
      ...INITIAL_BOARD_STATE,
      gameMode: gameModes.IN_PROGRESS,
      currentPlayer: players.first,
    });
  };

  const seeRecord = () =>
    setBoardState(state => ({ ...state, gameMode: gameModes.RECORD_VIEW }));

  const previousPlayers = usePrevious(players);
  useEffect(() => {
    if (!previousPlayers?.first && players.first) {
      setBoardState(state => ({ ...state, currentPlayer: players.first }));
    } else if (!previousPlayers?.second && players.second) {
      setBoardState(state => ({ ...state, gameMode: gameModes.IN_PROGRESS }));
    }
  }, [players, previousPlayers]);

  const previousIsWaiting = usePrevious(isWaitingForOpponent);
  useEffect(() => {
    if (!previousIsWaiting && isWaitingForOpponent) {
      setTimeout(() => {
        setPlayers(currentState => {
          const second = Object.values(playerIds).filter(
            id => id !== currentState.first
          )[0];
          return {
            ...currentState,
            second,
          };
        });
      }, 500);
    }
  }, [isWaitingForOpponent, previousIsWaiting]);

  const previousGameMode = usePrevious(boardState.gameMode);
  useEffect(() => {
    if (
      previousGameMode !== gameModes.FINISHED &&
      boardState.gameMode === gameModes.FINISHED
    ) {
      // Game is finished, let's set winning counts
      const player = boardState.winner?.player;
      setWinnings(currentWinnings => ({
        [player]: currentWinnings[player] ? currentWinnings[player] + 1 : 1,
      }));
    }
  }, [boardState.gameMode, boardState.winner, previousGameMode]);

  return {
    onCellClick,
    winnings,
    selectPlayer,
    boardState,
    players,
    matchSecondPlayer,
    isWaitingForOpponent,
    onPlayAgain,
    lastWinner,
    seeRecord,
  };
};
