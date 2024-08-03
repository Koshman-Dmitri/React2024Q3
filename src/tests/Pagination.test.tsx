import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/utils';
import { Pagination, ThemeToggler } from '../components';
import { ApiPagination } from '../services/ST-API/api.types';

const mockData: ApiPagination = {
  pageNumber: 5,
  pageSize: 15,
  numberOfElements: 1,
  totalElements: 100,
  totalPages: 10,
  firstPage: false,
  lastPage: false,
};

describe('Pagination', () => {
  test('Should render', async () => {
    renderWithProviders(<Pagination />, {
      preloadedState: {
        pagination: mockData,
      },
    });

    const prevButton = screen.getByText<HTMLButtonElement>('Prev');
    const nextButton = screen.getByText<HTMLButtonElement>('Next');
    await userEvent.click(prevButton);
    await userEvent.click(nextButton);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('Should be dark theme', async () => {
    const { container } = renderWithProviders(
      <>
        <Pagination />
        <ThemeToggler />
      </>
    );

    const switcher = screen.getByRole('checkbox');
    await userEvent.click(switcher);

    expect(container.firstElementChild?.className.includes('dark')).toBeTruthy();
  });
});
