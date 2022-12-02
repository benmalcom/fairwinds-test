import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { playerIds } from 'components/TicTacToe/util';
import PlayerSelection from './PlayerSelection';

const PLAYERS = { first: 'me', second: 'you' };

describe('<PlayerSelection />', function () {
  test('Renders with instructions', () => {
    const selectPlayerMock = jest.fn();
    const matchSecondPlayerMock = jest.fn();
    render(
      <PlayerSelection
        players={PLAYERS}
        selectPlayer={selectPlayerMock}
        matchSecondPlayer={matchSecondPlayerMock}
      />
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick your player/i)).toBeInTheDocument();
    expect(screen.getByText(playerIds.O)).toBeInTheDocument();
    expect(screen.getByText(playerIds.X)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Match me with my opponent' })
    ).toBeInTheDocument();
  });

  test('Renders with waiting for opponent', () => {
    const selectPlayerMock = jest.fn();
    const matchSecondPlayerMock = jest.fn();
    render(
      <PlayerSelection
        players={PLAYERS}
        selectPlayer={selectPlayerMock}
        matchSecondPlayer={matchSecondPlayerMock}
        isWaitingForOpponent={true}
      />
    );
    const playerO = screen.getByText(playerIds.O);
    userEvent.click(playerO);
    expect(selectPlayerMock).toHaveBeenCalled();
    expect(
      screen.getByText(/Waiting to find your opponent…/i)
    ).toBeInTheDocument();
  });
});
