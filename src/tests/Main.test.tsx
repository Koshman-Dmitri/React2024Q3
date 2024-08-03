import { act, renderHook, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { renderWithProviders } from './utils/utils';
import { Main } from '../components';
import { ApiData } from '../services/ST-API/api.types';
import { starTrekApi } from '../services/ST-API/api';
import { setupStore } from '../lib/store';
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
    totalPages: 10,
    firstPage: true,
    lastPage: true,
  },
};

const server = setupServer(
  http.post('https://stapi.co/api/v2/rest/astronomicalObject/search', () => {
    return HttpResponse.json(mockResponse);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Main', () => {
  test('Should be rendered', () => {
    renderWithProviders(<Main />);
    expect(screen.getByText(/results/i)).toBeInTheDocument();
  });

  test('Call api on render', async () => {
    function Wrapper({ children }: PropsWithChildren) {
      return <Provider store={setupStore()}>{children}</Provider>;
    }

    const { result } = renderHook(() => starTrekApi.useSearchForObjectsMutation(), {
      wrapper: Wrapper,
    });
    await act(() => result.current[0]({ query: 'query' }));
    expect(result.current[1].isSuccess).toBeTruthy();
    expect(result.current[1].status).toBe('fulfilled');
  });

  test('Catch if api unavailable', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    renderWithProviders(<Main />);
    server.use(
      http.post('https://stapi.co/api/v2/rest/astronomicalObject/search', () => {
        return HttpResponse.error();
      })
    );
  });

  test('Should has details branch', () => {
    const spy = vi.spyOn(URLSearchParams.prototype, 'has').mockImplementation(() => true);
    renderWithProviders(<Main />);
    expect(spy).toHaveBeenCalled();
  });
});
