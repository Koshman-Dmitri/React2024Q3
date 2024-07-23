import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/utils';
import { ErrorBoundary, TestErrorComponent } from '../components';
import '@testing-library/jest-dom';

describe('ErrorBoundary', () => {
  test('Should not render on init', () => {
    renderWithProviders(
      <ErrorBoundary>
        <TestErrorComponent />
      </ErrorBoundary>
    );

    const errorBtn = screen.queryByText('Fallback message');

    expect(errorBtn).not.toBeInTheDocument();
  });

  test('Should catch error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      renderWithProviders(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);

    expect(screen.getByText('Fallback message')).toBeInTheDocument();
  });

  test('Should close on closeBtn', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      renderWithProviders(
        <ErrorBoundary>
          <TestErrorComponent />
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

  test('Should close on overlay click', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    await act(() =>
      renderWithProviders(
        <ErrorBoundary>
          <TestErrorComponent />
        </ErrorBoundary>
      )
    );

    const errorBtn = screen.getByText('Throw error');
    await userEvent.click(errorBtn);
    expect(screen.getByText('Fallback message')).toBeInTheDocument();

    const overlay = screen.getByRole('presentation');
    await userEvent.click(overlay);
    expect(screen.queryByText('Fallback message')).not.toBeInTheDocument();
  });
});
