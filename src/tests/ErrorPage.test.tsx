import { screen } from '@testing-library/react';
import { ErrorPage } from '../components';
import { renderWithRouter } from './utils/utils';

describe('ErrorPage', () => {
  test('Should be rendered', () => {
    renderWithRouter(<ErrorPage />);

    const text = screen.getByText(/not found/i);
    expect(text).toBeInTheDocument();
  });
});
