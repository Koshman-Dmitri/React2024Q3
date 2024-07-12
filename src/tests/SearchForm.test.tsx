import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SearchForm } from '../components';
import '@testing-library/jest-dom';

const renderWithRouter = (component: ReactNode) => render(<MemoryRouter>{component}</MemoryRouter>);

describe('SearchForm', () => {
  test('Should be rendered', () => {
    renderWithRouter(<SearchForm />);
    const text = screen.getByText('Search astronomical object:');
    expect(text).toBeInTheDocument();
  });
});
