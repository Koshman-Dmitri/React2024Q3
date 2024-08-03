import reducerFavorite, {
  addFavorite,
  deleteFavorite,
  clearFavorite,
} from '../lib/slices/favoriteSlice';
import reducerList, { updateList } from '../lib/slices/listSlice';
import reducerPage, { updatePagination } from '../lib/slices/paginationSlice';
import { ApiElement, ApiPagination } from '../services/ST-API/api.types';

const mockElement: ApiElement = {
  uid: 'uid',
  name: 'name',
  astronomicalObjectType: 'astronomicalObjectType',
  location: {
    uid: 'uid',
    name: 'name',
  },
};

const mockElement2: ApiPagination = {
  pageNumber: 1,
  pageSize: 2,
  numberOfElements: 3,
  totalElements: 4,
  totalPages: 5,
  firstPage: true,
  lastPage: true,
};

describe('Favorite', () => {
  test('Should be added', () => {
    const previousState: ApiElement[] = [];
    expect(reducerFavorite(previousState, addFavorite(mockElement))).toEqual([mockElement]);
  });

  test('Should be deleted', () => {
    const previousState: ApiElement[] = [mockElement];
    expect(reducerFavorite(previousState, deleteFavorite('uid'))).toEqual([]);
  });

  test('Should be cleared', () => {
    const previousState: ApiElement[] = [mockElement];
    expect(reducerFavorite(previousState, clearFavorite())).toEqual([]);
  });
});

describe('List', () => {
  test('Should be updated', () => {
    const previousState: ApiElement[] = [];
    expect(reducerList(previousState, updateList([mockElement]))).toEqual([mockElement]);
  });
});

describe('Page', () => {
  test('Should be updated', () => {
    const previousState: ApiPagination = {
      pageNumber: 0,
      pageSize: 0,
      numberOfElements: 0,
      totalElements: 0,
      totalPages: 0,
      firstPage: false,
      lastPage: false,
    };
    expect(reducerPage(previousState, updatePagination(mockElement2))).toEqual(mockElement2);
  });
});
