import { ApiData, ApiElement } from '../../services/ST-API/api.types';

export const initState: ApiData = {
  astronomicalObjects: [],
  page: {
    pageNumber: 0,
    pageSize: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
  },
};

export const initDetailData: ApiElement = {
  uid: '',
  name: '',
  astronomicalObjectType: '',
  location: {
    uid: '',
    name: '',
  },
};
