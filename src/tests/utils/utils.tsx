import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

export const renderWithRouter = (component: ReactNode) =>
  render(<MemoryRouter>{component}</MemoryRouter>);

export const wrapperForHook = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);
