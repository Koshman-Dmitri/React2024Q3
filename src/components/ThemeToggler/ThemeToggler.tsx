import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggler.module.css';

export function ThemeToggler() {
  const { isLight, toggleTheme } = useTheme();

  return (
    <div className={isLight ? styles.toggler : `${styles.toggler} ${styles.dark}`}>
      <span className={styles.textLight}>Light</span>
      <input className={styles.input} type="checkbox" checked={!isLight} onChange={toggleTheme} />
      <span className={styles.textDark}>Dark</span>
    </div>
  );
}
