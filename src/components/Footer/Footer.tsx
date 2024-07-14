import { Pagination } from '../Pagination/Pagination';
import { PaginationProps } from '../Pagination/Pagination.types';
import { TestErrorComponent } from '../TestErrorComponent/TestErrorComponent';
import styles from './Footer.module.css';

export function Footer({ isFirstPage, isLastPage, currentPage, totalPages }: PaginationProps) {
  return (
    <div className={styles.footer}>
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <TestErrorComponent />
    </div>
  );
}
