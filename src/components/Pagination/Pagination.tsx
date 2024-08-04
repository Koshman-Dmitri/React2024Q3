'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../../hooks/useTheme';
import styles from './Pagination.module.css';
import { ApiPagination } from '../../services/ST-API/api.types';

export function Pagination({ paginationProps }: { paginationProps: ApiPagination }) {
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { isLight } = useTheme();

  const { firstPage, lastPage, pageNumber, totalPages } = paginationProps;

  const createQuery = (page: string, details?: string): string => {
    const params = new URLSearchParams();
    params.set('page', page);
    if (details) params.set('details', details);

    return params.toString();
  };

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
            onClick={() => {
              router.push(`${pathname}?${createQuery(String(page - 1))}`.replace('detail', ''));
            }}
          >
            Prev
          </button>
          <button
            className={styles.button}
            type="button"
            disabled={lastPage || pageNumber >= totalPages}
            onClick={() => {
              router.push(`${pathname}?${createQuery(String(page + 1))}`.replace('detail', ''));
            }}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
