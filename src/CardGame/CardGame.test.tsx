import React from 'react';
import { render, screen } from '@testing-library/react';
import CardGame from './CardGame';

test('renders hello world', () => {
  render(<CardGame />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});

//Initialise a shuffled single deck of cards
// Provide a button that will 'draw' a card from that deck
// Display an image of the newly drawn card, with an image of the previous card to its left (if there is no previous card, display a placeholder)
// If the value of the newly drawn card matches the previous one, display the message SNAP VALUE!
// If the suit of the newly drawn card matches the previous one, display the message SNAP SUIT!
// If neither the value nor suit match, display no message
// Once all 52 cards have been drawn, remove the button and instead display the total number of value matches and the total number of suit matches
