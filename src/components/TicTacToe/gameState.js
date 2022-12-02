import { useCallback, useEffect, useState } from 'react';
import {
  gameModes,
  playerIds,
  usePrevious,
  getWinnerFromBoardState,
  getAICellIndex,
} from './util';

/**
 * React hook to manage all the state changes in the game
 *
 * @param {Object} initialBoardState - the initial state of the board
 */
export const useGameState = initialBoardState => {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [winnings, setWinnings] = useState({});
  const [players, setPlayers] = useState({ first: null, second: null });
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);

  /**
   * @callbackThis function selects a player id for the first Player
   *
   * @param {String} playerId - This it the selected player id or name
   */
  const setFirstPlayer = playerId =>
    setPlayers(currentPlayers => ({ ...currentPlayers, first: playerId }));

  /**
   * @callback function when a cell is clicked, it updates the cell with the id of the current player
   * who clicked it and also checks if there's a current winner after this action, or if there's a tie.
   *
   * @param {Number} cellIndex - The index of the cell
   */
  const onCellClick = useCallback(
    cellIndex => {
      if (boardState.winner) return;
      if (boardState.cells[cellIndex]) return;
      setBoardState(state => {
        const cells = [...state.cells];
        cells[cellIndex] = state.currentPlayer;
        const configUpdate = { cells };
        const winner = getWinnerFromBoardState(cells, state.currentPlayer);
        if (winner) {
          configUpdate.winner = winner;
          configUpdate.gameMode = gameModes.FINISHED;
        } else {
          // Check if it's a tie and no winner
          if (cells.every(value => !!value)) {
            configUpdate.gameMode = gameModes.FINISHED;
          } else {
            configUpdate.currentPlayer =
              state.currentPlayer === playerIds.O ? playerIds.X : playerIds.O;
          }
        }

        return {
          ...state,
          ...configUpdate,
        };
      });
    },
    [boardState.cells, boardState.winner]
  );

  /**
   * Match second player after first player has been picked
   */
  const matchSecondPlayer = () => {
    if (!players.first) return;
    setIsWaitingForOpponent(true);
  };

  /**
   * Reset the board state for another game and keep track of last winner
   */
  const onPlayAgain = () => {
    if (boardState.winner?.player) {
      setLastWinner(boardState.winner?.player);
    }
    setBoardState({
      ...initialBoardState,
      gameMode: gameModes.IN_PROGRESS,
      currentPlayer: players.first,
    });
  };

  /**
   * Switch view to record screen
   */
  const seeRecord = () =>
    setBoardState(state => ({ ...state, gameMode: gameModes.RECORD_VIEW }));

  /**
   * Check players selection states, if first player has been selected, wait for second player,
   * if second player has been selected, switch screen to game in progress
   */
  const previousPlayers = usePrevious(players);
  useEffect(() => {
    if (
      (!previousPlayers?.first && players.first) ||
      (previousPlayers?.first &&
        players.first &&
        previousPlayers.first !== players.first)
    ) {
      setBoardState(state => ({ ...state, currentPlayer: players.first }));
    } else if (!previousPlayers?.second && players.second) {
      setBoardState(state => ({ ...state, gameMode: gameModes.IN_PROGRESS }));
    }
  }, [players, previousPlayers]);

  /**
   * Set second player since first player has been chosen, also add timeout to simulate waiting period
   */
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

  /**
   * Update winnings anytime a game is finished
   */
  const previousGameMode = usePrevious(boardState.gameMode);
  useEffect(() => {
    if (
      previousGameMode !== gameModes.FINISHED &&
      boardState.gameMode === gameModes.FINISHED
    ) {
      // Game is finished, let's set winning counts or set tie if no winner
      const player = boardState.winner?.player;

      setWinnings(currentWinnings => {
        const winningsUpdate = {};
        if (player) {
          winningsUpdate[player] = currentWinnings[player]
            ? currentWinnings[player] + 1
            : 1;
        } else {
          winningsUpdate.tie = currentWinnings.tie
            ? currentWinnings.tie + 1
            : 1;
        }
        return { ...currentWinnings, ...winningsUpdate };
      });
    }
  }, [boardState.gameMode, boardState.winner, previousGameMode]);

  /**
   * Look out for when the current player is switched to the computer AI,
   * get the AI cell index and trigger a cell click
   */
  const previousPlayer = usePrevious(boardState.currentPlayer);
  useEffect(() => {
    if (
      previousPlayer &&
      previousPlayer !== boardState.currentPlayer &&
      boardState.currentPlayer === players.second
    ) {
      const bestIndex = getAICellIndex(boardState.cells, players);
      // Simulate a 500ms second thinking time
      setTimeout(() => onCellClick(bestIndex), 500);
    }
  }, [
    boardState.cells,
    boardState.currentPlayer,
    onCellClick,
    players,
    previousPlayer,
  ]);

  return {
    onCellClick,
    winnings,
    setFirstPlayer,
    boardState,
    players,
    matchSecondPlayer,
    isWaitingForOpponent,
    onPlayAgain,
    lastWinner,
    seeRecord,
  };
};
