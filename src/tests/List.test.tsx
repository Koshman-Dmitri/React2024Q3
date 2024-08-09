import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/utils';
import { List, ThemeToggler } from '../components';
import { ApiElement } from '../services/ST-API/api.types';

const mockData: ApiElement[] = [
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
    renderWithProviders(<List listData={mockData} />);

    const list = screen.getAllByRole('presentation')[0];
    expect(list.childElementCount).toBe(3);
  });

  test('Should display message if no data', () => {
    renderWithProviders(<List listData={[]} />);

    const message = screen.getByText(/No results/i);
    expect(message).toBeInTheDocument();
  });

  test('Call handlers', async () => {
    renderWithProviders(<List listData={mockData} />);

    const list = screen.getAllByRole('presentation');
    await userEvent.click(list[0]);

    const listElement = screen.getAllByRole('presentation');
    await userEvent.click(listElement[1]);

    const checkbox = screen.getAllByRole('checkbox');
    await userEvent.click(checkbox[0]); // for checked
    await userEvent.click(checkbox[0]); // for unchecked
  });

  test('Render relevant data', () => {
    renderWithProviders(<List listData={mockData} />);

    const elementName1 = screen.getByText('One');
    const elementName2 = screen.getByText('Two');
    const elementName3 = screen.getByText('Three');
    expect(elementName1).toBeInTheDocument();
    expect(elementName2).toBeInTheDocument();
    expect(elementName3).toBeInTheDocument();
  });

  test('Should be dark theme', async () => {
    renderWithProviders(
      <>
        <ThemeToggler />
        <List listData={[]} />
      </>
    );

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);

    expect(screen.getAllByRole('presentation')[0].className.includes('dark')).toBeTruthy();
  });
});
