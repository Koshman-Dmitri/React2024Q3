import { ReactNode } from 'react';
import { ApiElement, ApiPagination } from '../../services/ST-API/api.types';

export interface MainProps {
  listProps: ApiElement[];
  paginationProps: ApiPagination;
  children: ReactNode;
}
