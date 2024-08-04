import { Props } from '../../app/globalTypes';
import { ApiData, ApiElement, ApiPagination } from './api.types';

export interface RenderProps {
  listProps: ApiElement[];
  paginationProps: ApiPagination;
  detailData: { astronomicalObject: ApiElement } | null;
}

const PAGE_SIZE = 15;
const ENDPOINT = 'https://stapi.co/api/v2/rest/astronomicalObject';

export const routerApi = {
  searchData: async ({ query, page }: { query: string; page: number }): Promise<ApiData> => {
    const response = await fetch(`${ENDPOINT}/search?pageNumber=${page}&pageSize=${PAGE_SIZE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name: query }),
      cache: 'no-store',
    });
    return response.json() as Promise<ApiData>;
  },

  getObject: async (id: string): Promise<{ astronomicalObject: ApiElement }> => {
    const response = await fetch(`${ENDPOINT}?uid=${id}`, { cache: 'no-store' });
    return response.json() as Promise<{ astronomicalObject: ApiElement }>;
  },
};

export const getProps = async ({ query, page, details }: Props) => {
  const mainData = await routerApi.searchData({ query, page });

  let detailData = null;
  if (details) {
    detailData = await routerApi.getObject(details);
  }

  return { mainData, detailData };
};
