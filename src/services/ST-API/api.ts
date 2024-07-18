import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiData, ApiElement, SearchProps } from './api.types';

const PAGE_SIZE = 15;

export const starTrekApi = createApi({
  reducerPath: 'starTrekApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/astronomicalObject' }),
  endpoints: (builder) => ({
    getObjectById: builder.query<{ astronomicalObject: ApiElement }, string>({
      query: (id) => `?uid=${id}`,
    }),
    searchForObjects: builder.mutation<ApiData, SearchProps>({
      query: ({ query, page = 0 }) => ({
        url: `/search?pageNumber=${page}&pageSize=${PAGE_SIZE}`,
        method: 'POST',
        body: new URLSearchParams({ name: query }),
      }),
    }),
  }),
});
