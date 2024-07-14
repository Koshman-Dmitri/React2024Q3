import { useState } from 'react';
import styles from './TestErrorComponent.module.css';

export function TestErrorComponent() {
  const [isError, setIsError] = useState(false);

  const handleClick = (): void => setIsError(true);

  if (isError) throw new Error('Crash test passed successfully');

  return (
    <button className={styles.errorButton} type="button" onClick={handleClick}>
      Throw error
    </button>
  );
}
