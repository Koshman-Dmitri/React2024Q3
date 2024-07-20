import { Outlet } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { ErrorBoundary, SearchForm, ThemeToggler } from './components';
import { FlyOut } from './components/FlyOut/FlyOut';
import styles from './App.module.css';

function App() {
  const { isLight } = useTheme();

  return (
    <ErrorBoundary>
      <div className={isLight ? styles.page : `${styles.page} ${styles.dark}`}>
        <div className={styles.container}>
          <ThemeToggler />
          <SearchForm />
          <Outlet />
          <FlyOut />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
