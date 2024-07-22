import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils/utils';
import { FlyOut } from '../components/FlyOut/FlyOut';
import '@testing-library/jest-dom';
import { ThemeToggler } from '../components';

const mockData = [
  {
    uid: 'Fake uid',
    name: 'Fake name',
    astronomicalObjectType: 'Fake type',
    location: {
      uid: 'Fake location ID',
      name: 'Fake location name',
    },
  },
  {
    uid: 'Fake uid',
    name: 'Fake name',
    astronomicalObjectType: 'Fake type',
    location: {
      uid: 'Fake location ID',
      name: 'Fake location name',
    },
  },
];

describe('FlyOut', () => {
  test('Should be rendered', async () => {
    renderWithProviders(<FlyOut />);
    const unsellectBtn = screen.getByText('Unsellect all');
    await userEvent.click(unsellectBtn);
    expect(unsellectBtn).toBeInTheDocument();
  });

  test('Should be dark theme', async () => {
    const { container } = renderWithProviders(
      <>
        <ThemeToggler />
        <FlyOut />
      </>,
      {
        preloadedState: { favorite: mockData },
      }
    );

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);
    expect(container.firstElementChild?.className.includes('dark')).toBeTruthy();
  });
});
