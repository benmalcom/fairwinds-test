import './index.scss';
import Record from 'components/TicTacToe/Record';
import Board from './Board';
import { gameModes, useGameState } from './gameState';
import PlayerSelection from './PlayerSelection';

const TicTacToe = () => {
  const {
    onCellClick,
    selectPlayer,
    boardState,
    players,
    isWaitingForOpponent,
    matchSecondPlayer,
    onPlayAgain,
    winnings,
    lastWinner,
    gameStatusText,
    seeRecord,
  } = useGameState();

  const getCurrentScreen = () => {
    if (
      boardState.gameMode === gameModes.IN_PROGRESS ||
      boardState.gameMode === gameModes.FINISHED
    ) {
      return (
        <Board
          onSeeRecord={seeRecord}
          gameStatusText={gameStatusText}
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

    if (boardState.gameMode === gameModes.RECORD_VIEW) {
      return (
        <Record
          gameStatusText={gameStatusText}
          winnings={winnings}
          players={players}
          onPlayAgain={onPlayAgain}
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
