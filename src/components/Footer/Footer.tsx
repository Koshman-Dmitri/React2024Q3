import { Pagination } from '../Pagination/Pagination';
import { TestErrorComponent } from '../TestErrorComponent/TestErrorComponent';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <Pagination />
      <TestErrorComponent />
    </div>
  );
}
