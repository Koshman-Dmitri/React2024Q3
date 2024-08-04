import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils/utils';
import StoreProvider from '../context/StoreProvider';

describe('StoreProvider', () => {
  test('Should be rendered', () => {
    renderWithProviders(
      <StoreProvider>
        <h1>Test</h1>
      </StoreProvider>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
