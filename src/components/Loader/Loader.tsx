import { PureComponent, ReactNode } from 'react';
import styles from './Loader.module.css';

export class Loader extends PureComponent {
  render(): ReactNode {
    return (
      <div className={styles.overlay}>
        <div className={styles.loader} />
      </div>
    );
  }
}
