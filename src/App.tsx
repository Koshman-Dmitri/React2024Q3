import { ErrorBoundary, Main, SearchForm } from './components';
import styles from './App.module.css';

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <SearchForm />
        <Main />
      </div>
    </ErrorBoundary>
  );
}

export default App;
