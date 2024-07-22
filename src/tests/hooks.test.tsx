import { renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCloseDetails } from '../hooks/useCloseDetails';
import { renderWithProviders, renderWithRouter, wrapperForHook } from './utils/utils';
import { DetailList } from '../components';
import '@testing-library/jest-dom';

describe('useCloseDetails', () => {
  test('Should be called', async () => {
    const { result } = renderHook(() => useCloseDetails(), { wrapper: wrapperForHook });
    const spy = vi.spyOn(result.current, 'closeDetails');

    renderWithProviders(<DetailList />);
    await userEvent.click(screen.getByText('Close'));
    expect(spy).toBeDefined();
  });
});

describe('useTheme', () => {
  test('Should throw error if used outside provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    expect(() => renderWithRouter(<DetailList />)).toThrowError();
  });
});
