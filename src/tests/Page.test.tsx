import MainPage from '../app/main-page';
import { renderWithProviders } from './utils/utils';

const mockPageProps = {
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

describe('Page', () => {
  test('Main page should be rendered without detail list', () => {
    const { container } = renderWithProviders(
      <MainPage
        listProps={mockPageProps.astronomicalObjects}
        paginationProps={mockPageProps.page}
        detailData={null}
      />
    );
    expect(container).toBeDefined();
  });

  test('Main page should be rendered with detail list', () => {
    const mockDetail = {
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

    const { container } = renderWithProviders(
      <MainPage
        listProps={mockPageProps.astronomicalObjects}
        paginationProps={mockPageProps.page}
        detailData={mockDetail}
      />
    );
    expect(container).toBeDefined();
  });
});
