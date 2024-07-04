import { ApiData } from './api.types';

const ENDPOINT = 'https://stapi.co/api/v2/rest/astronomicalObject/search';
const PAGE_SIZE = 10;

function getURL(page = 0): string {
  return `${ENDPOINT}?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
}

export const api = {
  getData: async (): Promise<ApiData> => {
    const response = await fetch(getURL());
    return response.json() as Promise<ApiData>;
  },

  searchData: async (query: string): Promise<ApiData> => {
    const response = await fetch(getURL(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name: query }),
    });
    return response.json() as Promise<ApiData>;
  },
};
