import { PureComponent, ReactNode } from 'react';
import { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.css';

export class Pagination extends PureComponent<PaginationProps> {
  render(): ReactNode {
    const { isFirstPage, isLastPage, currentPage, totalPages, handlePrev, handleNext } = this.props;
    const showCurPage = totalPages ? currentPage + 1 : 0;

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
              disabled={isFirstPage}
              onClick={handlePrev}
            >
              Prev
            </button>
            <button
              className={styles.button}
              type="button"
              disabled={isLastPage}
              onClick={handleNext}
            >
              Next
            </button>
          </>
        )}
      </div>
    );
  }
}
