import { renderWithProviders } from './utils/utils';
import Page from '../pages';

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

describe('Page', () => {
  test('Page should be rendered', () => {
    const { container } = renderWithProviders(
      <Page listProps={[]} paginationProps={mockPageProps.page} detailData={mockResponse} />
    );
    expect(container).toBeDefined();
  });
});
