import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import countriesReducer from './slices/countriesSlice';

const rootReducer = combineReducers({
  forms: formsReducer,
  countries: countriesReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
