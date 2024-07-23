import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './TestErrorComponent.module.css';

export function TestErrorComponent() {
  const [isError, setIsError] = useState(false);
  const { isLight } = useTheme();

  const handleClick = (): void => setIsError(true);

  if (isError) throw new Error('Crash test passed successfully');

  const className = isLight ? styles.errorButton : `${styles.errorButton} ${styles.dark}`;

  return (
    <button className={className} type="button" onClick={handleClick}>
      Throw error
    </button>
  );
}
