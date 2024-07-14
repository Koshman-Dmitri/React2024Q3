import styles from './Loader.module.css';

export function Loader() {
  return (
    <div data-testid="loader" className={styles.overlay}>
      <div className={styles.loader} />
    </div>
  );
}
