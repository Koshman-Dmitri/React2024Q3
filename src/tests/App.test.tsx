import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/utils';
import App from '../App';

describe('App', () => {
  test('Should be rendered', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Search astronomical object:')).toBeInTheDocument();
  });

  test('Should be light theme', () => {
    const { container } = renderWithProviders(<App />);
    expect(container.firstElementChild?.classList.contains('dark')).toBeFalsy();
  });

  test('Should be dark theme', async () => {
    const { container } = renderWithProviders(<App />);

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);

    expect(container.firstElementChild?.className.includes('dark')).toBeTruthy();
  });
});
