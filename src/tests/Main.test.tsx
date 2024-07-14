import { act, renderHook, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, wrapperForHook } from './utils/utils';
import { Main } from '../components';
import { ApiData } from '../services/ST-API/api.types';
import '@testing-library/jest-dom';

const mockResponse: ApiData = {
  astronomicalObjects: [
    {
      uid: 'Fake uid',
      name: 'Fake name',
      astronomicalObjectType: 'Fake type',
      location: {
        uid: 'Fake location ID',
        name: 'Fake location name',
      },
    },
  ],
  page: {
    pageNumber: 0,
    pageSize: 1,
    numberOfElements: 1,
    totalElements: 1,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
};

describe('Main', () => {
  test('Should be rendered', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response);
    });

    await act(() => renderWithRouter(<Main />));
    expect(screen.getByText(/fake name/i)).toBeInTheDocument();
  });

  test('Should show error message if api not available', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.reject(),
      } as Response);
    });

    await act(() => renderWithRouter(<Main />));
    expect(screen.getByText(/not fetch/i)).toBeInTheDocument();
  });

  test('Open details onclick', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response);
    });

    await act(() => renderWithRouter(<Main />));

    const { result } = renderHook(() => useSearchParams(), { wrapper: wrapperForHook });
    const element = screen.getByText('Fake name');

    await userEvent.click(element);
    act(() => result.current[1]({ page: '1', details: 'id' }));

    const hasDetails = window.location.search.includes('details');
    expect(hasDetails).toBeTruthy();
  });

  test('Trigger additional api call to fetch details', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response);
    });

    await act(() => renderWithRouter(<Main />));
    expect(fetch).toHaveBeenCalledTimes(2);

    const element = screen.getByText('Fake name');
    await userEvent.click(element);

    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
