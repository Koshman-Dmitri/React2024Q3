import { createCsvHref } from '../utils/createCsvHref';

describe('createCsVHref', () => {
  test('Should make csv format', () => {
    const mockData = [
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
    ];

    expect(createCsvHref(mockData)).toBe(
      'data:text/csv;charset=utf-8,uid;name;astronomicalObjectType;location%0A1;One;planet;location1%0A2;Two;star;location2'
    );
  });

  test('Should return empty string if no arguments', () => {
    expect(createCsvHref([])).toBe('');
  });
});
