import { renderWithProviders } from './utils/utils';
import Page from '../pages';
import PageWithSearch from '../pages/[...search]';

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
    const { container } = renderWithProviders(<Page detailData={mockResponse} />);
    expect(container).toBeDefined();
  });

  test('Search page should be rendered', () => {
    const { container } = renderWithProviders(<PageWithSearch detailData={mockResponse} />);
    expect(container).toBeDefined();
  });
});
