import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestErrorComponent, ThemeToggler } from '../components';
import { renderWithProviders } from './utils/utils';
import '@testing-library/jest-dom';

describe('TestErrorComponent', () => {
  test('Should be dark theme', async () => {
    renderWithProviders(
      <>
        <ThemeToggler />
        <TestErrorComponent />
      </>
    );

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);

    expect(screen.getByText('Throw error').className.includes('dark')).toBeTruthy();
  });
});
