import { act, renderHook, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, wrapperForHook } from './utils/utils';
import { List, Main } from '../components';
import '@testing-library/jest-dom';

describe('Main', () => {
  test('Open details onclick', async () => {
    const mockClickHandler = vi.fn();
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
        <List data={data} clickHandler={mockClickHandler} closeHandler={mockCLoseHandler} />
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
    const mockClickHandler = vi.fn();
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
        <List data={data} clickHandler={mockClickHandler} closeHandler={mockCLoseHandler} />
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
