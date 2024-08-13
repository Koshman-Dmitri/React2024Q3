import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uncontrolledReducer from './slices/uncontrolledFormSlice';
import reactHookFormReducer from './slices/reactHookFormSlice';
import countriesReducer from './slices/countriesSlice';

const rootReducer = combineReducers({
  uncontrolledForm: uncontrolledReducer,
  reactHookForm: reactHookFormReducer,
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
