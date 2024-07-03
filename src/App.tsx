import { PureComponent, ReactNode } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import styles from './App.module.css';

class App extends PureComponent {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <section className={styles.topSection}>
          <SearchForm />
        </section>
        <section className={styles.botSection}>TODO LIST</section>
      </div>
    );
  }
}

export default App;
