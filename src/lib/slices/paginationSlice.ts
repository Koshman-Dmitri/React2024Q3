import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ApiPagination } from '../../services/ST-API/api.types';

interface PayloadPagination {
  pagination: ApiPagination;
}

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
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_, action) => {
      const { payload } = action as PayloadAction<PayloadPagination>;
      return payload.pagination;
    });
  },
});

export const { updatePagination } = paginationSlice.actions;

export default paginationSlice.reducer;
