import React from 'react';
import { render, screen } from '@testing-library/react';
import CardGame from './CardGame';

test('renders learn react link', () => {
  render(<CardGame />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
