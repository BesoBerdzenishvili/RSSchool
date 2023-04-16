import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const characterApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (id: number) => `/character/${id}`,
    }),
    getSearch: builder.query({
      query: (searchValue: string) => `/character/?name=${searchValue}&page=1`,
    }),
  }),
});

export const { useGetDataQuery, useGetSearchQuery } = characterApi;
