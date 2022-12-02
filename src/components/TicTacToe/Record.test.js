import { render, screen } from '@testing-library/react';
import Record from './Record';

const PLAYERS = { first: 'me', second: 'you' };

describe('<Record />', function () {
  test('Renders with status text', () => {
    const onPlayAgainMock = jest.fn();
    render(
      <Record
        onPlayAgain={onPlayAgainMock}
        gameStatusText="O's turn"
        players={PLAYERS}
        winnings={{}}
      />
    );
    expect(screen.getByText(/O'S TURN/i)).toBeInTheDocument();
  });

  test('Renders with accurate player statistics', () => {
    const onPlayAgainMock = jest.fn();
    render(
      <Record
        onPlayAgain={onPlayAgainMock}
        gameStatusText="O's turn"
        players={PLAYERS}
        winnings={{
          [PLAYERS.first]: 3,
          [PLAYERS.second]: 2,
          tie: 1,
        }}
      />
    );
    expect(
      screen.getByText(/You have won 3 times and lost 2 times/i)
    ).toBeInTheDocument();
  });
});
