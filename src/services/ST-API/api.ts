import { ApiData, ApiElement } from './api.types';

const OBJECT_ENDPOINT = 'https://stapi.co/api/v2/rest/astronomicalObject?uid=';
const ENDPOINT = 'https://stapi.co/api/v2/rest/astronomicalObject/search';
const PAGE_SIZE = 15;

function getURL(page: number): string {
  return `${ENDPOINT}?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
}

export const api = {
  getObject: async (id: string): Promise<{ astronomicalObject: ApiElement }> => {
    const response = await fetch(OBJECT_ENDPOINT + id);
    return response.json() as Promise<{ astronomicalObject: ApiElement }>;
  },

  searchData: async (query: string, page = 0): Promise<ApiData> => {
    const response = await fetch(getURL(page), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name: query }),
    });
    return response.json() as Promise<ApiData>;
  },
};
