import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { starTrekApi } from '../services/ST-API/api';
import listReducer from './slices/listSlice';
import paginationReducer from './slices/paginationSlice';
import favoriteReducer from './slices/favoriteSlice';

const rootReducer = combineReducers({
  list: listReducer,
  pagination: paginationReducer,
  favorite: favoriteReducer,
  [starTrekApi.reducerPath]: starTrekApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starTrekApi.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
