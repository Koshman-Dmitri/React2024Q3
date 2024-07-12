import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchForm } from '../components';
import { renderWithRouter } from './utils/utils';
import '@testing-library/jest-dom';

describe('SearchForm', () => {
  test('Should be rendered', () => {
    renderWithRouter(<SearchForm />);

    const text = screen.getByText<HTMLInputElement>('Search astronomical object:');
    expect(text).toBeInTheDocument();
  });

  test('Click on Search saves value to LS', async () => {
    renderWithRouter(<SearchForm />);

    const searchBtn = screen.getByRole<HTMLButtonElement>('button');
    const input = screen.getByLabelText<HTMLInputElement>('Search astronomical object:');

    await userEvent.type(input, '12345');
    await userEvent.click(searchBtn);

    expect(input.value).toBe(JSON.parse(localStorage.getItem('prevSearch_KD')!));
  });

  test('Get value from LS on mounting', () => {
    const testValue = 'TestValue';
    localStorage.setItem('prevSearch_KD', testValue);

    renderWithRouter(<SearchForm />);
    const input = screen.getByLabelText<HTMLInputElement>('Search astronomical object:');

    setTimeout(() => expect(input.value).toBe(testValue), 100);
  });
});
