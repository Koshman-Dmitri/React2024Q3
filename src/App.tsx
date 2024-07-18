import { Outlet } from 'react-router-dom';
import { ErrorBoundary, SearchForm } from './components';
import { FlyOut } from './components/FlyOut/FlyOut';
import styles from './App.module.css';

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <SearchForm />
        <Outlet />
        <FlyOut />
      </div>
    </ErrorBoundary>
  );
}

export default App;
