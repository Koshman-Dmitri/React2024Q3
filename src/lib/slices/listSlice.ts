import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ApiElement } from '../../services/ST-API/api.types';

interface PayloadList {
  list: ApiElement[];
}

const initialState: ApiElement[] = [];

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    updateList: (_, action: PayloadAction<ApiElement[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_, action) => {
      const { payload } = action as PayloadAction<PayloadList>;
      return payload.list;
    });
  },
});

export const { updateList } = listSlice.actions;

export default listSlice.reducer;
