import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { setupStore } from '../lib/store';
import { starTrekApi } from '../services/ST-API/api';
import { renderWithProviders } from './utils/utils';
import { DetailList } from '../components';
import '@testing-library/jest-dom';

const store = setupStore();

const mockResponse = {
  astronomicalObject: {
    uid: 'Fake uid',
    name: 'Fake name',
    astronomicalObjectType: 'Fake type',
    location: {
      uid: 'Fake location ID',
      name: 'Fake location name',
    },
  },
};

const server = setupServer(
  http.get('https://stapi.co/api/v2/rest/astronomicalObject', () => {
    return HttpResponse.json(mockResponse);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Detail List', () => {
  test('Show loader on fetching', () => {
    renderWithProviders(<DetailList />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('Correctly display valid data', async () => {
    renderWithProviders(<DetailList />);
    const testElement = await screen.findByText('Fake type');
    expect(testElement).toBeInTheDocument();
  });

  test('Close on click', () => {
    renderWithProviders(<DetailList />);
    const closeBtn = screen.getByText('Close');
    expect(closeBtn).toBeInTheDocument();
  });

  test('Correctly display empty data', async () => {
    store.dispatch(starTrekApi.util.resetApiState());

    server.use(
      http.get('https://stapi.co/api/v2/rest/astronomicalObject', () => {
        return HttpResponse.json({});
      })
    );

    renderWithProviders(<DetailList />);
    const todoElement = await screen.findAllByText('No such object');
    expect(todoElement[0]).toBeInTheDocument();
  });
});
