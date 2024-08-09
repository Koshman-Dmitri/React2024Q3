import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchForm, ThemeToggler } from '../components';
import { renderWithProviders } from './utils/utils';

describe('SearchForm', () => {
  test('Should be rendered', () => {
    renderWithProviders(<SearchForm />);

    const text = screen.getByText<HTMLInputElement>('Search astronomical object:');
    expect(text).toBeInTheDocument();
  });

  test('Click on Search saves value to LS', async () => {
    renderWithProviders(<SearchForm />);

    const searchBtn = screen.getByRole<HTMLButtonElement>('button');
    const input = screen.getByLabelText<HTMLInputElement>('Search astronomical object:');

    await userEvent.type(input, '12345');
    await userEvent.click(searchBtn);

    expect(input.value).toBe(JSON.parse(localStorage.getItem('prevSearch_KD')!));
  });

  test('Should be dark theme', async () => {
    const { container } = renderWithProviders(
      <>
        <ThemeToggler />
        <SearchForm />
      </>
    );

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);

    expect(container.firstElementChild?.className.includes('dark')).toBeTruthy();
  });
});
