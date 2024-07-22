import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils/utils';
import App from '../App';
import '@testing-library/jest-dom';

describe('App', () => {
  test('Should be rendered', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Search astronomical object:')).toBeInTheDocument();
  });

  test('Should be light theme', () => {
    const { container } = renderWithProviders(<App />);
    expect(container.firstElementChild?.classList.contains('dark')).toBeFalsy();
  });
});
