import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from './utils/utils';
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
});
