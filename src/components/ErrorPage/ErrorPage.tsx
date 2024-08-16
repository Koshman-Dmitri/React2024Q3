import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>Page Not Found</h1>
      <p>Sorry, try correct URL</p>
      <p>
        <Link to="/react-hook-form" className={styles.link}>
          /react-hook-form
        </Link>{' '}
        or{' '}
        <Link to="/uncontrolled-form" className={styles.link}>
          /uncontrolled-form
        </Link>
      </p>
    </div>
  );
}

export default ErrorPage;
