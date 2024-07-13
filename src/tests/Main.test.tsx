import { act, renderHook, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, wrapperForHook } from './utils/utils';
import { List, Main } from '../components';
import { ApiData } from '../services/ST-API/api.types';
import '@testing-library/jest-dom';

describe('Main', () => {
  test('Should be rendered', async () => {
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
    const mockCLoseHandler = vi.fn();
    const data = [
      {
        uid: '1',
        name: 'Test element',
        astronomicalObjectType: 'planet',
        location: {
          uid: '11',
          name: 'location1',
        },
      },
    ];

    renderWithRouter(
      <>
        <Main />
        <List data={data} closeHandler={mockCLoseHandler} />
      </>
    );
    const { result } = renderHook(() => useSearchParams(), { wrapper: wrapperForHook });
    const element = screen.getByText('Test element');

    await userEvent.click(element);
    act(() => result.current[1]({ page: '1', details: 'id' }));

    const hasDetails = window.location.search.includes('details');
    expect(hasDetails).toBeTruthy();
  });

  test('Trigger additional api call to fetch details', async () => {
    const mockCLoseHandler = vi.fn();
    const data = [
      {
        uid: '1',
        name: 'Test element',
        astronomicalObjectType: 'planet',
        location: {
          uid: '11',
          name: 'location1',
        },
      },
    ];

    renderWithRouter(
      <>
        <Main />
        <List data={data} closeHandler={mockCLoseHandler} />
      </>
    );
    const { result } = renderHook(() => useSearchParams(), { wrapper: wrapperForHook });
    const element = screen.getByText('Test element');

    await userEvent.click(element);
    act(() => result.current[1]({ page: '1', details: 'id' }));

    const hasDetails = window.location.search.includes('details');
    expect(hasDetails).toBeTruthy();
  });
});
