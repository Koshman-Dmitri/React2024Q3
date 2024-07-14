import { useSearchParams } from 'react-router-dom';
import { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.css';

export function Pagination({ isFirstPage, isLastPage, currentPage, totalPages }: PaginationProps) {
  const [queryParams, setQueryParams] = useSearchParams();

  const showCurPage = totalPages ? currentPage + 1 : 0;
  const page = Number(queryParams.get('page'));

  return (
    <div className={styles.pagination}>
      <p className={styles.pageCounter}>
        Page: {showCurPage}/{totalPages}
      </p>
      {totalPages !== 0 && (
        <>
          <button
            className={styles.button}
            type="button"
            disabled={isFirstPage || currentPage >= totalPages}
            onClick={() => setQueryParams({ page: String(page - 1) })}
          >
            Prev
          </button>
          <button
            className={styles.button}
            type="button"
            disabled={isLastPage || currentPage >= totalPages}
            onClick={() => setQueryParams({ page: String(page + 1) })}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
