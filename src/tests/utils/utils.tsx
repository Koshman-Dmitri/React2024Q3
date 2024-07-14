import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

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
