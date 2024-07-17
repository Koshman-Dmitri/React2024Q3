import { configureStore } from '@reduxjs/toolkit';
import { starTrekApi } from '../services/ST-API/api';

export const store = configureStore({
  reducer: {
    [starTrekApi.reducerPath]: starTrekApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starTrekApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
