import { renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCloseDetails } from '../hooks/useCloseDetails';
import { renderWithProviders, renderWithRouter, wrapperForHook } from './utils/utils';
import { DetailList } from '../components';

const mockData = {
  astronomicalObject: {
    uid: 'uid',
    name: 'name',
    astronomicalObjectType: 'astronomicalObjectType',
    location: {
      uid: 'uid',
      name: 'name',
    },
  },
};

describe('useCloseDetails', () => {
  test('Should be called', async () => {
    const { result } = renderHook(() => useCloseDetails(), { wrapper: wrapperForHook });
    const spy = vi.spyOn(result.current, 'closeDetails');

    renderWithProviders(<DetailList data={mockData} />);
    await userEvent.click(screen.getByText('Close'));
    expect(spy).toBeDefined();
  });
});

describe('useTheme', () => {
  test('Should throw error if used outside provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    expect(() => renderWithRouter(<DetailList data={mockData} />)).toThrowError();
  });
});
