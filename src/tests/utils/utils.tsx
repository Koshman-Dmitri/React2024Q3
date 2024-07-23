import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppStore, RootState, setupStore } from '../../app/store';
import { ThemeProvider } from '../../context/ThemeContext';

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
