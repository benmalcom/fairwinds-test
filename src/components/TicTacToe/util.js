import { useRef, useEffect } from 'react';
// Hook
export const usePrevious = value => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 4, 8],
];

export const gameModes = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished',
  RECORD_VIEW: 'record_view',
};

export const playerIds = {
  X: 'X',
  O: 'O',
};

export const getWinnerFromBoardState = (cells, player) => {
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
