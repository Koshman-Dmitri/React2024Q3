import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { ApiPagination } from '../../services/ST-API/api.types';
import styles from './Pagination.module.css';

export function Pagination({ paginationProps }: { paginationProps: ApiPagination }) {
  const [queryParams, setQueryParams] = useSearchParams();
  const { isLight } = useTheme();

  const { firstPage, lastPage, pageNumber, totalPages } = paginationProps;

  const showCurPage = totalPages ? pageNumber + 1 : 0;
  const page = Number(queryParams.get('page'));

  return (
    <div className={isLight ? styles.pagination : `${styles.pagination} ${styles.dark}`}>
      <p className={styles.pageCounter}>
        Page: {showCurPage}/{totalPages}
      </p>
      {totalPages !== 0 && (
        <>
          <button
            className={styles.button}
            type="button"
            disabled={firstPage || pageNumber >= totalPages}
            onClick={() => setQueryParams({ page: String(page - 1) })}
          >
            Prev
          </button>
          <button
            className={styles.button}
            type="button"
            disabled={lastPage || pageNumber >= totalPages}
            onClick={() => setQueryParams({ page: String(page + 1) })}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
