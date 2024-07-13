import { screen } from '@testing-library/react';
import { renderWithRouter } from './utils/utils';
import App from '../App';
import '@testing-library/jest-dom';

describe('App', () => {
  test('Should be rendered', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Search astronomical object:')).toBeInTheDocument();
  });
});
