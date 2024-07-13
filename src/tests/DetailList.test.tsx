import { screen } from '@testing-library/react';
import { renderWithRouter } from './utils/utils';
import { DetailList } from '../components';
import '@testing-library/jest-dom';

describe('Detail List', () => {
  test('Correctly display valid data', async () => {
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

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response);
    });

    renderWithRouter(<DetailList />);

    const testElement = await screen.findByText('Fake type');
    expect(testElement).toBeInTheDocument();
  });

  test('Close on click', () => {
    renderWithRouter(<DetailList />);
    const closeBtn = screen.getByText('Close');
    expect(closeBtn).toBeInTheDocument();
  });

  test('Show loader on fetching', () => {
    renderWithRouter(<DetailList />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('Correctly display empty data', async () => {
    const mockResponse = {
      invalidData: {
        uid: 'Fake uid',
        name: 'Fake name',
        astronomicalObjectType: 'Fake type',
        location: {
          uid: 'Fake location ID',
          name: 'Fake location name',
        },
      },
    };

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response);
    });

    renderWithRouter(<DetailList />);

    const todoElement = await screen.findAllByText('No such object');
    expect(todoElement[0]).toBeInTheDocument();
  });
});
