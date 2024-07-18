import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiElement } from '../../services/ST-API/api.types';

const initialState: ApiElement[] = [];

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ApiElement>) => {
      state.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) =>
      state.filter((fav) => fav.uid !== action.payload),
    clearFavorite: () => [],
  },
});

export const { addFavorite, deleteFavorite, clearFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
