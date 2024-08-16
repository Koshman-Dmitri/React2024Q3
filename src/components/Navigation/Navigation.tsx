import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link to="/react-hook-form" className={styles.link}>
        React Hook Form
      </Link>
      <Link to="/uncontrolled-form" className={styles.link}>
        Uncontrolled Form
      </Link>
    </nav>
  );
}

export default Navigation;
