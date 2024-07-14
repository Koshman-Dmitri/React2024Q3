import { act, renderHook, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, wrapperForHook } from './utils/utils';
import { Pagination } from '../components';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  test('Open details onclick', async () => {
    const currentPage = 5;

    renderWithRouter(
      <Pagination
        isFirstPage={false}
        isLastPage={false}
        currentPage={currentPage}
        totalPages={10}
      />
    );
    const { result } = renderHook(() => useSearchParams(), { wrapper: wrapperForHook });
    act(() => result.current[1]({ page: `${currentPage}` }));

    const prevButton = screen.getByText<HTMLButtonElement>('Prev');
    const nextButton = screen.getByText<HTMLButtonElement>('Next');

    const mockBack = () => act(() => result.current[1]({ page: String(currentPage - 1) }));
    const mockForward = () => act(() => result.current[1]({ page: String(currentPage + 1) }));

    await userEvent.click(prevButton);
    mockBack();
    expect(window.location.search).toBe('?page=4');

    await userEvent.click(nextButton);
    mockForward();
    expect(window.location.search).toBe('?page=6');
  });
});
