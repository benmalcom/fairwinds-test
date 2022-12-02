import './index.scss';
import Record from 'components/TicTacToe/Record';
import Board from './Board';
import { useGameState } from './gameState';
import PlayerSelection from './PlayerSelection';
import { gameModes } from './util';

const INITIAL_BOARD_STATE = {
  cells: Array(9).fill(''),
  currentPlayer: null,
  winner: null,
  gameMode: gameModes.NOT_STARTED,
};

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
    seeRecord,
  } = useGameState(INITIAL_BOARD_STATE);

  const getGamePlayStatusText = () => {
    const { currentPlayer, winner, gameMode } = boardState;
    let status = `${currentPlayer}'s turn!`;

    if (gameMode === gameModes.FINISHED || gameMode === gameModes.RECORD_VIEW) {
      if (winner) {
        status =
          lastWinner && lastWinner === winner.player
            ? `${winner.player} wins again!`
            : `${winner.player} wins!`;
      } else {
        status = `It's a tie!`;
      }
    }
    return status;
  };

  const getCurrentScreen = () => {
    if (
      boardState.gameMode === gameModes.IN_PROGRESS ||
      boardState.gameMode === gameModes.FINISHED
    ) {
      return (
        <Board
          onSeeRecord={seeRecord}
          gameStatusText={getGamePlayStatusText()}
          winnings={winnings}
          currentPlayer={boardState.currentPlayer}
          cells={boardState.cells}
          onCellClick={onCellClick}
          winner={boardState.winner}
          onPlayAgain={onPlayAgain}
          lastWinner={lastWinner}
          showActionButtons={boardState.gameMode === gameModes.FINISHED}
        />
      );
    }

    if (boardState.gameMode === gameModes.RECORD_VIEW) {
      return (
        <Record
          gameStatusText={getGamePlayStatusText()}
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
