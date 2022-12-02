import './index.scss';
import Board from './Board';
import { gameModes, useGameState } from './gameState';
import PlayerSelection from './PlayerSelection';

const TicTacToe = () => {
  const {
    isATie,
    onCellClick,
    selectPlayer,
    boardState,
    players,
    isWaitingForOpponent,
    matchSecondPlayer,
    onPlayAgain,
    winnings,
    lastWinner,
  } = useGameState();

  const getCurrentScreen = () => {
    if (
      boardState.gameMode === gameModes.IN_PROGRESS ||
      boardState.gameMode === gameModes.FINISHED
    ) {
      return (
        <Board
          winnings={winnings}
          currentPlayer={boardState.currentPlayer}
          cells={boardState.cells}
          onCellClick={onCellClick}
          winner={boardState.winner}
          onPlayAgain={onPlayAgain}
          lastWinner={lastWinner}
        />
      );
    }
    return (
      <PlayerSelection
        matchSecondPlayer={matchSecondPlayer}
        selectPlayer={selectPlayer}
        players={players}
        isWaitingForOpponent={isWaitingForOpponent}
      />
    );
  };

  return <div className="wrapper">{getCurrentScreen()}</div>;
};

export default TicTacToe;
