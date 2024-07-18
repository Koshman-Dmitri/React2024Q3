import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './Pagination.module.css';

export function Pagination() {
  const [queryParams, setQueryParams] = useSearchParams();

  const { firstPage, lastPage, pageNumber, totalPages } = useAppSelector(
    (state) => state.pagination
  );

  const showCurPage = totalPages ? pageNumber + 1 : 0;
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
