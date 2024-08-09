import { ApiPagination } from '../../services/ST-API/api.types';
import { Pagination } from '../Pagination/Pagination';
import { TestErrorComponent } from '../TestErrorComponent/TestErrorComponent';
import styles from './Footer.module.css';

export function Footer({ paginationProps }: { paginationProps: ApiPagination }) {
  return (
    <div className={styles.footer}>
      <Pagination paginationProps={paginationProps} />
      <TestErrorComponent />
    </div>
  );
}
