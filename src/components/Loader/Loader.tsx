import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader} />
    </div>
  );
}
