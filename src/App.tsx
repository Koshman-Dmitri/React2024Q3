import { PropsWithChildren } from 'react';
import { useTheme } from './hooks/useTheme';
import { ErrorBoundary, Main, SearchForm, ThemeToggler } from './components';
import { FlyOut } from './components/FlyOut/FlyOut';
import styles from './App.module.css';

function App({ children }: PropsWithChildren) {
  const { isLight } = useTheme();

  return (
    <ErrorBoundary>
      <div className={isLight ? styles.page : `${styles.page} ${styles.dark}`}>
        <div className={styles.container}>
          <ThemeToggler />
          <SearchForm />
          <Main>{children}</Main>
          <FlyOut />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
