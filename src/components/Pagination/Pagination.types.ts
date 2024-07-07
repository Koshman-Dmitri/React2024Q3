export interface PaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
}
