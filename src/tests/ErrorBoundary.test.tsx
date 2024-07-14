import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './utils/utils';
import { ErrorBoundary, Main } from '../components';
import '@testing-library/jest-dom';

describe('ErrorBoundary', () => {
  test('Should catch error', async () => {
    await act(() =>
      renderWithRouter(
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);

    expect(screen.getByText('Fallback message')).toBeInTheDocument();
  });

  test('Should close onclick', async () => {
    await act(() =>
      renderWithRouter(
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);
    expect(screen.getByText('Fallback message')).toBeInTheDocument();

    const closeBtn = screen.getByText('Close');
    await userEvent.click(closeBtn);
    expect(screen.queryByText('Fallback message')).not.toBeInTheDocument();
  });
});
