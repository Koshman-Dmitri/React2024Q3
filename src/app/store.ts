import { configureStore } from '@reduxjs/toolkit';
import { starTrekApi } from '../services/ST-API/api';
import listReducer from './slices/listSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    list: listReducer,
    pagination: paginationReducer,
    [starTrekApi.reducerPath]: starTrekApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starTrekApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
