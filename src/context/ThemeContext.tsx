'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';

export interface IThemeContext {
  isLight: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLight] = useState(true);

  const toggleTheme = () => setIsLight((prev) => !prev);

  const memoValue = useMemo(() => ({ isLight, toggleTheme }), [isLight]);

  return <ThemeContext.Provider value={memoValue}>{children}</ThemeContext.Provider>;
}
