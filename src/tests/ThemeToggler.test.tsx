import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils/utils';
import { ThemeToggler } from '../components';

describe('ThemeToggler', () => {
  test('Should be rendered', () => {
    renderWithProviders(<ThemeToggler />);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  test('Toggle theme', async () => {
    const { container } = renderWithProviders(<ThemeToggler />);

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);

    expect(container.firstElementChild?.className.includes('dark')).toBeTruthy();
  });
});
