import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AppStore, RootState } from '../../lib/store';
import { ThemeProvider } from '../../context/ThemeContext';
import { starTrekApi } from '../../services/ST-API/api';
import listReducer from '../../lib/slices/listSlice';
import paginationReducer from '../../lib/slices/paginationSlice';
import favoriteReducer from '../../lib/slices/favoriteSlice';

export const renderWithRouter = (component: ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(component, { wrapper: MemoryRouter }),
  };
};

export const wrapperForHook = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  route?: string;
}

const rootReducer = combineReducers({
  list: listReducer,
  pagination: paginationReducer,
  favorite: favoriteReducer,
  [starTrekApi.reducerPath]: starTrekApi.reducer,
});

function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starTrekApi.middleware),
    preloadedState,
  });
}

export const renderWithProviders = (
  component: ReactNode,
  {
    route = '/',
    preloadedState = {},
    store = setupStore(preloadedState),
  }: ExtendedRenderOptions = {}
) => {
  window.history.pushState({}, 'Test page', route);

  function Wrapper() {
    return (
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>{component}</ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
  }

  return {
    user: userEvent.setup(),
    store,
    ...render(component, { wrapper: Wrapper }),
  };
};
