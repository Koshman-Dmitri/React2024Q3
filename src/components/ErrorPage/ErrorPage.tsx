import styles from './ErrorPage.module.css';

export function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>Not Foudnd</h1>
      <p>Sorry, try correct URL</p>
    </div>
  );
}
