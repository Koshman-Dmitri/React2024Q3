import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiPagination } from '../../services/ST-API/api.types';

const initialState: ApiPagination = {
  pageNumber: 0,
  pageSize: 0,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  firstPage: true,
  lastPage: true,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePagination: (_, action: PayloadAction<ApiPagination>) => {
      return action.payload;
    },
  },
});

export const { updatePagination } = paginationSlice.actions;

export default paginationSlice.reducer;
