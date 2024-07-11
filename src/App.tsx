import { Outlet } from 'react-router-dom';
import { ErrorBoundary, SearchForm } from './components';
import styles from './App.module.css';

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <SearchForm />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default App;
