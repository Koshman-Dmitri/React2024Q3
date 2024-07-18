import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiElement } from '../../services/ST-API/api.types';

const initialState: ApiElement[] = [];

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    updateList: (_, action: PayloadAction<ApiElement[]>) => {
      return action.payload;
    },
  },
});

export const { updateList } = listSlice.actions;

export default listSlice.reducer;
