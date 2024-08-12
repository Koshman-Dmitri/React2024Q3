import { Link } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
    <nav className={styles.nav}>
      <Link to="/react-hook-form">React Hook Form</Link>
      <Link to="/uncontrolled-form">React Hook Form</Link>
    </nav>
  );
}

export default App;
