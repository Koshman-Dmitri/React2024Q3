import { PureComponent, ReactNode } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { PaginationProps } from '../Pagination/Pagination.types';
import { TestErrorComponent } from '../TestErrorComponent/TestErrorComponent';
import styles from './Footer.module.css';

export class Footer extends PureComponent<PaginationProps> {
  render(): ReactNode {
    const { isFirstPage, isLastPage, currentPage, totalPages, handlePrev, handleNext } = this.props;

    return (
      <div className={styles.footer}>
        <Pagination
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
        <TestErrorComponent />
      </div>
    );
  }
}
