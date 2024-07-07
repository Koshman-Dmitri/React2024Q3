import { ApiData } from './api.types';

const ENDPOINT = 'https://stapi.co/api/v2/rest/astronomicalObject/search';
const PAGE_SIZE = 10;

function getURL(page: number): string {
  return `${ENDPOINT}?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
}

export const api = {
  searchData: async (query: string, page = 0): Promise<ApiData> => {
    const response = await fetch(getURL(page), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name: query }),
    });
    return response.json() as Promise<ApiData>;
  },
};
