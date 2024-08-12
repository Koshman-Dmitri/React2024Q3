import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uncontrolledReducer from './slices/uncontrolledFormSlice';
import reactHookFormReducer from './slices/reactHookFormSlice';

const rootReducer = combineReducers({
  uncontrolledForm: uncontrolledReducer,
  reactHookForm: reactHookFormReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
