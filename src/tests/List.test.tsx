import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './utils/utils';
import { List } from '../components';
import '@testing-library/jest-dom';

const mockClickHandler = vi.fn();
const mockCLoseHandler = vi.fn();
const data = [
  {
    uid: '1',
    name: 'One',
    astronomicalObjectType: 'planet',
    location: {
      uid: '11',
      name: 'location1',
    },
  },
  {
    uid: '2',
    name: 'Two',
    astronomicalObjectType: 'star',
    location: {
      uid: '22',
      name: 'location2',
    },
  },
  {
    uid: '3',
    name: 'Three',
    astronomicalObjectType: 'asteroid',
    location: {
      uid: '33',
      name: 'location3',
    },
  },
];

describe('List', () => {
  test('Should rendered specified numbers of elements', () => {
    renderWithRouter(
      <List data={data} clickHandler={mockClickHandler} closeHandler={mockCLoseHandler} />
    );

    const list = screen.getAllByRole('presentation')[0];
    expect(list.childElementCount).toBe(3);
  });

  test('Should display message if no data', () => {
    renderWithRouter(
      <List data={[]} clickHandler={mockClickHandler} closeHandler={mockCLoseHandler} />
    );

    const message = screen.getByText(/No results/i);
    expect(message).toBeInTheDocument();
  });

  test('Call click handler', async () => {
    renderWithRouter(
      <List data={data} clickHandler={mockClickHandler} closeHandler={mockCLoseHandler} />
    );

    const element = screen.getAllByRole('presentation')[1];
    await userEvent.click(element);
    expect(mockClickHandler).toHaveBeenCalledOnce();
  });

  test('Call close handler', async () => {
    renderWithRouter(
      <List data={[]} clickHandler={mockClickHandler} closeHandler={mockCLoseHandler} />
    );

    const element = screen.getByRole('presentation');
    await userEvent.click(element);
    expect(mockCLoseHandler).toHaveBeenCalledOnce();
  });
});
