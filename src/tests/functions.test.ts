import { createCsvHref } from '../utils/createCsvHref';
import { makePageQuery } from '../utils/makePageQuery';

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

  test('Should return empty string if no arguments', () => {
    const mockData = [
      {
        uid: '1',
        name: 'One',
        astronomicalObjectType: 'planet',
        location: null,
      },
    ];

    expect(createCsvHref(mockData)).toBe(
      'data:text/csv;charset=utf-8,uid;name;astronomicalObjectType;location%0A1;One;planet;No%20info'
    );
  });
});

describe('makePageQuery', () => {
  test('Should return right', () => {
    expect(makePageQuery({ params: { slug: 'string' }, searchParams: { page: 'page' } })).toEqual({
      details: undefined,
      page: 0,
      query: 's',
    });
  });

  test('Should return right if has details', () => {
    expect(makePageQuery({ params: { slug: ['detail'] }, searchParams: { page: 'page' } })).toEqual(
      {
        details: undefined,
        page: 0,
        query: '',
      }
    );
  });
});
